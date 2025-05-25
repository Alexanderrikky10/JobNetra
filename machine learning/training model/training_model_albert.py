import pandas as pd
import os
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
import tensorflow as tf
# from tensorflow.python.keras.layers import Input, Dense, Dropout, Lambda
# from tensorflow.python.keras.models import Model

# from tensorflow.keras.callbacks import Callback
# from tensorflow.keras.layers import Dense, Input, Dropout, Lambda
# from tensorflow.keras.models import Model
# from tensorflow.keras.regularizers import l2

from transformers import AlbertTokenizer, TFAlbertModel

from keras.callbacks import Callback
from keras.layers import Input, Dense, Dropout, Lambda
from keras.models import Model
from keras.regularizers import l2
# from keras import layers, models, Model
# from keras.models import Sequential
# from keras.layers import Dense

import numpy as np
from sklearn.model_selection import train_test_split

def read_excel():
    df = pd.read_excel('judul_pekerjaan/data_80_persen_training.xlsx')
    # df.drop(["nama_pekerjaan", "similarity_score"], axis=1, inplace=True)
    return df

def output_read(df_data):
    print("Jumlah pekerjaan unik:", df_data['nama_pekerjaan_terbaik'].nunique())
    print(df_data.head())


class AlbertClassifier(Model):
    def __init__(self, num_classes, dropout_rate=0.3, **kwargs):
        super().__init__(**kwargs)

        # Pre-trained BERT model
        local_path = "model/model_albert_base_v2"
        self.bert = TFAlbertModel.from_pretrained(local_path)
        self.dropout = Dropout(dropout_rate)
        self.classifier = Dense(num_classes, activation='softmax', kernel_regularizer=l2(0.01))

    def call(self, inputs, training=False):
        outputs = self.bert(
            input_ids=inputs['input_ids'],
            attention_mask=inputs['attention_mask'],
            training=training
        )
        pooled_output = outputs.pooler_output
        # pooled_output = outputs.last_hidden_state[:, 0]
        x = self.dropout(pooled_output, training=training)
        return self.classifier(x)

class CustomCallback(Callback):
    def __init__(self, model, val_data, label_encoder, tokenizer):
        super().__init__()
        self.model_ref = model
        self.val_data = val_data
        self.save_dir_pb = 'saved_model/pb'
        self.save_dir_tflite = 'saved_model/tflite'
        os.makedirs(self.save_dir_pb, exist_ok=True)
        os.makedirs(self.save_dir_tflite, exist_ok=True)
        self.tokenizer = tokenizer
        self.label_encoder = label_encoder
        self.best_val_acc = 0.0

    def on_epoch_end(self, epoch, logs=None):
        val_acc = logs.get('val_accuracy')
        train_acc = logs.get('accuracy')
        if val_acc:
            acc_str_val = f"{val_acc:.3f}"
            acc_str_train = f"{train_acc:.3f}"

            if val_acc > self.best_val_acc:
                name = f"epoch_{epoch+1}_accuracyval_{acc_str_val}_accuracytrain_{acc_str_train}"
                self.best_val_acc = val_acc
                print("Hasil validasi accuracy terbaik ditemukan, menyimpan model...")
                
                # Save pb
                self.model_ref.save(os.path.join(self.save_dir_pb, name), save_format="tf")

                # Save TFLite
                converter = tf.lite.TFLiteConverter.from_keras_model(self.model_ref)
                tflite_model = converter.convert()
                with open(os.path.join(self.save_dir_tflite, f"{name}.tflite"), "wb") as f:
                    f.write(tflite_model)
                
                print(f"[INFO] Saved model: {name}.h5 and .tflite")


            # Stop accuracy
            if val_acc >= 0.85 and train_acc >= 0.80:
                self.model_ref.stop_training = True


def save_artifacts(label_encoder, tokenizer):
    os.makedirs("saved_model/artifacts", exist_ok=True)
    with open("saved_model/artifacts/label_encoder.pkl", "wb") as f:
        pickle.dump(label_encoder, f)
    tokenizer.save_pretrained("saved_model/artifacts/tokenizer")


def processing(df_data):
    # Buat text sebagai x dan labels sebagai y
    texts = df_data['skill'].fillna("").tolist()
    labels = df_data['nama_pekerjaan_terbaik']

    # Encoding label
    le = LabelEncoder()
    y = le.fit_transform(labels)
    num_classes = len(le.classes_)

    # Split data
    train_texts, test_texts, y_train, y_test = train_test_split(
        texts, y, test_size=0.2, random_state=42, stratify=y  
    )

    # Tokenize test dan train
    local_path = "model/model_albert_base_v2"
    tokenizer = AlbertTokenizer.from_pretrained(local_path)
    train_encodings = tokenizer(
        train_texts,
        truncation=True,
        padding=True,
        max_length=128,
        return_tensors='tf'
    )
    test_encodings = tokenizer(
        test_texts,
        truncation=True,
        padding=True,
        max_length=128,
        return_tensors='tf'
    )

    # Dict inputs
    train_inputs = {
        'input_ids': train_encodings['input_ids'],
        'attention_mask': train_encodings['attention_mask']
    }
    test_inputs = {
        'input_ids': test_encodings['input_ids'],
        'attention_mask': test_encodings['attention_mask']
    }

    save_artifacts(le, tokenizer)

    train_model(train_inputs, test_inputs, y_train, y_test, num_classes, tokenizer, le)


def train_model(train_inputs, test_inputs, y_train, y_test, num_classes, tokenizer, label_encoder, batch_size=32, epochs=1000):
    # Instantiate classifier
    model = AlbertClassifier(num_classes)

    # Compile
    optimizer = tf.keras.optimizers.Adam(learning_rate=0.5) #learning_Rate=2e-5
    model.compile(optimizer=optimizer,
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    custom_cb = CustomCallback(model, (test_inputs, y_test), label_encoder, tokenizer)

    # # Fit
    # model.fit(
    #     x=train_inputs,
    #     y=y_train,
    #     validation_data=(test_inputs, y_test),
    #     epochs=epochs,
    #     batch_size=batch_size,
    #     verbose=1,
    #     callbacks=[custom_cb]
    # )

    # ------------------------------------- yang baru agar per epoch
    # Buat tf.data.Dataset dari input dan label
    train_dataset = tf.data.Dataset.from_tensor_slices((train_inputs, y_train))
    train_dataset = train_dataset.shuffle(buffer_size=1000).batch(batch_size)

    test_dataset = tf.data.Dataset.from_tensor_slices((test_inputs, y_test))
    test_dataset = test_dataset.batch(batch_size)

    # Fit model
    model.fit(
        train_dataset,
        validation_data=test_dataset,
        epochs=epochs,
        verbose=1,
        callbacks=[custom_cb]
    )
    # ------------------------------------- yang baru agar per epoch


    # Evaluate
    loss, acc = model.evaluate(test_dataset)
    print(f"Test Accuracy: {acc:.2f}")


df_data = read_excel()
output_read(df_data)
processing(df_data)
