import tensorflow as tf
from transformers import BertTokenizer
import joblib
import os
import numpy as np

# 1. Load model 
model_path = r"C:\Users\Acer\Algoritma python\DBS - Coding Camp\ubah data\saved_model\pb\epoch_7_accuracy_1.000"
loaded_model = tf.saved_model.load(model_path)
inference_fn = loaded_model.signatures["serving_default"]

# 2. Load tokenizer (HuggingFace format) 
tokenizer_dir = r"C:\Users\Acer\Algoritma python\DBS - Coding Camp\ubah data\saved_model\artifacts\tokenizer"
tokenizer = BertTokenizer.from_pretrained(tokenizer_dir)

# 3. Load LabelEncoder 
label_encoder_path = r"C:\Users\Acer\Algoritma python\DBS - Coding Camp\ubah data\saved_model\artifacts\label_encoder.pkl"
label_encoder = joblib.load(label_encoder_path)

# 4. Dummy input 
# dummy_input = ["machine learning", "pandas", "data analysis", "python", "react"]
# inputs = tokenizer(
#     dummy_input,
#     return_tensors="tf",
#     truncation=True,
#     padding="max_length",  # <- tambahkan ini!
#     max_length=29         # <- samakan dengan training
# )

# 4. Dummy input 
# dummy_input = "machine learning, pandas"
dummy_input = 'deep learning'
inputs = tokenizer(dummy_input, return_tensors='tf', padding="max_length", truncation=True, max_length=24)
inputs_dict = {
    "input_ids": inputs["input_ids"],
    "attention_mask": inputs["attention_mask"]
}


# 5. Lakukan inference 
output = inference_fn(
    input_ids=inputs["input_ids"],
    attention_mask=inputs["attention_mask"])
print("Input shape:", inputs["input_ids"].shape)

#  6. Ambil logits dari output dan prediksi kelas 
logits = list(output.values())[0]  # ambil output tensor pertama
predicted_class = tf.argmax(logits, axis=1).numpy()
decoded_label = label_encoder.inverse_transform(predicted_class)

#  7. Print hasil 
print("Logits shape:", logits.shape)
print("Predicted classes:", predicted_class)
print("Decoded labels:", decoded_label)
# for i, input_text in enumerate(dummy_input):
#     print(f"Input: {input_text}")
#     print(f"Predicted job: {decoded_label[i]}")
#     print("-----")
print(f"Input skills: {dummy_input}")
print(f"Predicted job: {decoded_label[0]}")