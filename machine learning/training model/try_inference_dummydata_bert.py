import tensorflow as tf
from transformers import BertTokenizer
import joblib
import os
import numpy as np

# 1. Load model 
model_path = r"C:\Users\Acer\Algoritma python\DBS - Coding Camp\capstone_by_andreas\saved_model\pb\continuebyAndreas_epoch_350_accuracyval_0.905_accuracytrain_0.886"
loaded_model = tf.saved_model.load(model_path)
inference_fn = loaded_model.signatures["serving_default"]

# 2. Load tokenizer (HuggingFace format) 
tokenizer_dir = r"C:\Users\Acer\Algoritma python\DBS - Coding Camp\capstone_by_andreas\saved_model\artifacts"
tokenizer = BertTokenizer.from_pretrained(tokenizer_dir)

# 3. Load LabelEncoder 
label_encoder_path = r"C:\Users\Acer\Algoritma python\DBS - Coding Camp\capstone_by_andreas\saved_model\artifacts\label_encoder.pkl"
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
# dummy_input = "algorithms, collaboration, critical thinking, data analysis skills, data quality, data visualizations, itil processes, load testing, machine learning (ml), problem solving" #data-entry
dummy_input = "business administration, customer service, data center, efiling, high attention to detail, microsoft office suite (word excel powerpoint outlook), multitasking, note taking, problem solving, records management" #IT-administration
# dummy_input = 'algorithms, classroom management, collaboration, critical thinking, efiling'
inputs = tokenizer(dummy_input, return_tensors='tf', padding="max_length", truncation=True, max_length=77)
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
print("Attention_mask", inputs["attention_mask"])
print("Input shape:", inputs["input_ids"])
print("Output Tensor:", output)


#  6. Ambil logits dari output dan prediksi kelas 
logits = list(output.values())[0]  # ambil output tensor pertama
probs = tf.nn.softmax(logits, axis=1)

top_k = 5
top_probs, top_indices = tf.math.top_k(probs, k=top_k)

top_labels = label_encoder.inverse_transform(top_indices.numpy()[0])

#  7. Print hasil 
# print("Logits shape:", logits.shape)
# print("Predicted classes:", predicted_class)
# print("Decoded labels:", decoded_label)
# # for i, input_text in enumerate(dummy_input):
# #     print(f"Input: {input_text}")
# #     print(f"Predicted job: {decoded_label[i]}")
# #     print("-----")
# print(f"Input skills: {dummy_input}")
# print(f"Predicted job: {decoded_label[0]}")
print(f"\nInput skills: {dummy_input}")
print("Top predictions:")
for i in range(top_k):
    print(f"{i+1}. {top_labels[i]} (prob: {top_probs[0][i].numpy():.4f})")