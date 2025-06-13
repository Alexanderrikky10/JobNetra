import tensorflow as tf
from transformers import BertTokenizer, AlbertTokenizer
import joblib
import os
import numpy as np

# 1. Load model 
model_path = r"C:\Users\Acer\Algoritma python\DBS - Coding Camp\ubah data\saved_model\pb\continue_epoch_270_accuracyval_0.333_accuracytrain_0.083"
loaded_model = tf.saved_model.load(model_path)
inference_fn = loaded_model.signatures["serving_default"]

# 2. Load tokenizer (HuggingFace format) 
tokenizer_dir = r"C:\Users\Acer\Algoritma python\DBS - Coding Camp\ubah data\saved_model\artifacts\tokenizer"
tokenizer = AlbertTokenizer.from_pretrained(tokenizer_dir)

# 3. Load LabelEncoder 
label_encoder_path = r"C:\Users\Acer\Algoritma python\DBS - Coding Camp\ubah data\saved_model\artifacts\label_encoder.pkl"
label_encoder = joblib.load(label_encoder_path)

# 4. Dummy input 
# dummy_input = "accounting, finance, excel"
dummy_input = ''
inputs = tokenizer(dummy_input, return_tensors='tf', padding="max_length", truncation=True, max_length=29)
inputs_dict = {
    "input_ids": inputs["input_ids"],
    "attention_mask": inputs["attention_mask"]
}


# 5. Lakukan inference 
# output = inference_fn(
#     input_ids=inputs["input_ids"],
#     attention_mask=inputs["attention_mask"])
output = inference_fn(
    inputs=tf.cast(inputs["input_ids"], tf.float32),
    inputs_1=tf.cast(inputs["attention_mask"], tf.float32)
)
print("Input shape:", inputs["input_ids"].shape)

# #  6. Ambil logits dari output dan prediksi kelas 
# logits = list(output.values())[0]  # ambil output tensor pertama
# predicted_class = tf.argmax(logits, axis=1).numpy()
# decoded_label = label_encoder.inverse_transform(predicted_class)

# #  7. Print hasil 
# print("Logits shape:", logits.shape)
# print("Predicted classes:", predicted_class)
# print("Decoded labels:", decoded_label)
# # for i, input_text in enumerate(dummy_input):
# #     print(f"Input: {input_text}")
# #     print(f"Predicted job: {decoded_label[i]}")
# #     print("-----")
# print(f"Input skills: {dummy_input}")
# print(f"Predicted job: {decoded_label[0]}")


# 7. Ambil logits dan hitung probabilitas
logits = list(output.values())[0]
probs = tf.nn.softmax(logits, axis=1)

# 8. Top-N predictions
top_k = 3
top_probs, top_indices = tf.math.top_k(probs, k=top_k)

# 9. Decode label untuk 1 input
top_labels = label_encoder.inverse_transform(top_indices.numpy()[0])

# 10. Print hasil
print(f"\nInput skills: {dummy_input}")
print("Top predictions:")
for i in range(top_k):
    print(f"{i+1}. {top_labels[i]} (prob: {top_probs[0][i].numpy():.4f})")