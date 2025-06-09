import pandas as pd
import os
import pickle
from tensorflow.keras.callbacks import Callback
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
import tensorflow as tf
# from tensorflow.python.keras.layers import Input, Dense, Dropout, Lambda
# from tensorflow.python.keras.models import Model
from tensorflow.keras.layers import Dense, Input, Dropout, Lambda, BatchNormalization
from tensorflow.keras.models import Model
from transformers import BertTokenizer, TFBertModel
from tensorflow.keras.regularizers import l2

# from keras.layers import Input, Dense, Dropout, Lambda
# from keras.models import Model
# from keras import layers, models, Model
# from keras.models import Sequential
# from keras.layers import Dense
import numpy as np
from sklearn.model_selection import train_test_split

def read_excel():
    df = pd.read_excel('judul_pekerjaan/ps_60_fs2_10lmt_fr_lbl200_hubsp_80.xlsx')
    df.drop(["nama_pekerjaan", "similarity_score"], axis=1, inplace=True)
    return df

def output_read(df_data):
    print("Jumlah pekerjaan unik:", df_data['nama_pekerjaan_terbaik'].nunique())
    print(df_data.head())

df_data = read_excel()

class BertClassifier(Model):
    def __init__(self, num_classes, dropout_rate=0.1, **kwargs):
        super().__init__(**kwargs)

        self.num_classes = num_classes
        self.dropout_rate = dropout_rate

        # Pre-trained BERT model
        self.bert = TFBertModel.from_pretrained("bert-base-uncased")

        self.dropout = Dropout(dropout_rate) 

        # Layer 1
        self.dense1 = Dense(256, activation='gelu')
        self.batchnorm1 = BatchNormalization()
        self.dropout1 = Dropout(dropout_rate)

        # Layer 2
        self.dense2 = Dense(256, activation='gelu')
        self.batchnorm2 = BatchNormalization()
        self.dropout2 = Dropout(dropout_rate)

        self.classifier = Dense(num_classes, activation='softmax', kernel_regularizer=l2(0.0001))

    def call(self, inputs, training=False):
        input_ids, attention_mask = inputs['input_ids'], inputs['attention_mask']

        # CAST agar tidak error
        input_ids = tf.cast(input_ids, tf.int32)
        attention_mask = tf.cast(attention_mask, tf.int32)

        outputs = self.bert(
            input_ids=input_ids,
            attention_mask=attention_mask,
            training=training
        )
        # pooled_output = outputs.pooler_output
        pooled_output = outputs.last_hidden_state[:, 0]
        x = self.dropout(pooled_output, training=training)

        # Layer 1
        x = self.dense1(x)
        x = self.batchnorm1(x, training=training)
        x = self.dropout1(x, training=training)

        # Layer 2
        x = self.dense2(x)
        x = self.batchnorm2(x, training=training)
        x = self.dropout2(x, training=training)

        return self.classifier(x)

    def get_config(self):
        config = super().get_config()
        config.update({
            "num_classes": self.num_classes,
            "dropout_rate": self.dropout_rate
        })
        return config

    @classmethod
    def from_config(cls, config):
        return cls(**config)

class CustomCallback(Callback):
    def __init__(self, model, val_data, label_encoder, tokenizer):
        super().__init__()
        self.model_ref = model
        self.val_data = val_data
        self.save_dir_pb = "saved_model/pb"
        self.save_dir_tflite = "saved_model/tflite"
        self.save_dir_keras = "saved_model/keras"
        self.save_dir_h5 = "saved_model/h5"
        os.makedirs(self.save_dir_pb, exist_ok=True)
        os.makedirs(self.save_dir_tflite, exist_ok=True)
        os.makedirs(self.save_dir_keras, exist_ok=True)
        os.makedirs(self.save_dir_h5, exist_ok=True)
        self.tokenizer = tokenizer
        self.label_encoder = label_encoder
        self.best_val_acc = 0.45

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

                # Save .pb
                tf.saved_model.save(self.model_ref, os.path.join(self.save_dir_pb, name))

                # Save .keras
                keras_path = os.path.join(self.save_dir_keras, f"{name}.keras")
                self.model_ref.save(keras_path)

                # Save .h5
                h5_path = os.path.join(self.save_dir_h5, f"{name}.h5")
                self.model_ref.save(h5_path)

                # Save tflite
                def model_fn(input_ids, attention_mask):
                  return self.model_ref({'input_ids': input_ids, 'attention_mask': attention_mask}, training=False)

                concrete_func = tf.function(model_fn).get_concrete_function(
                    tf.TensorSpec(shape=[None, None], dtype=tf.int32, name='input_ids'),
                    tf.TensorSpec(shape=[None, None], dtype=tf.int32, name='attention_mask')
                )

                converter = tf.lite.TFLiteConverter.from_concrete_functions([concrete_func])
                tflite_model = converter.convert()
                with open(os.path.join(self.save_dir_tflite, f"{name}.tflite"), "wb") as f:
                    f.write(tflite_model)

                # converter = tf.lite.TFLiteConverter.from_keras_model(self.model_ref)
                # tflite_model = converter.convert()
                # with open(os.path.join(self.save_dir_tflite, f"{name}.tflite"), "wb") as f:
                #     f.write(tflite_model)

                print(f"[INFO] Saved model: {name} ke .pb, .keras, .h5, .tflite")


            # Stop accuracy
            if val_acc >= 0.85 and train_acc >= 0.80:
                self.model.stop_training = True


def save_artifacts(label_encoder, tokenizer, save_dir="saved_model/artifacts"):
    os.makedirs(save_dir, exist_ok=True)
    with open(os.path.join(save_dir, "label_encoder.pkl"), "wb") as f:
        pickle.dump(label_encoder, f)
    tokenizer.save_pretrained("saved_model/artifacts")


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
    tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
    train_encodings = tokenizer(
        train_texts,
        truncation=True,
        padding=True,
        max_length=256,
        return_tensors='tf'
    )
    test_encodings = tokenizer(
        test_texts,
        truncation=True,
        padding=True,
        max_length=256,
        return_tensors='tf'
    )

    # Dict inputs
    train_inputs = {
        'input_ids': tf.cast(train_encodings['input_ids'], tf.int32),
        'attention_mask': tf.cast(train_encodings['attention_mask'], tf.int32)
    }
    test_inputs = {
        'input_ids': tf.cast(test_encodings['input_ids'], tf.int32),
        'attention_mask': tf.cast(test_encodings['attention_mask'], tf.int32)
    }
    print(train_encodings['input_ids'].dtype)  # Harusnya int32
    print(train_encodings['attention_mask'].dtype)

    save_artifacts(le, tokenizer)

    train_model(train_inputs, test_inputs, y_train, y_test, num_classes, tokenizer, le)


def train_model(train_inputs, test_inputs, y_train, y_test, num_classes, tokenizer, label_encoder, batch_size=32, epochs=1000):
    # Instantiate classifier
    model = BertClassifier(num_classes)

    # Compile
    optimizer = tf.keras.optimizers.Adam(learning_rate=2e-5) #learning_Rate=2e-5
    model.compile(optimizer=optimizer,
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    custom_cb = CustomCallback(model, (test_inputs, y_test), label_encoder, tokenizer)

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

    # Evaluate
    loss, acc = model.evaluate(test_dataset)
    print(f"Test Accuracy: {acc:.2f}")

output_read(df_data)
processing(df_data)