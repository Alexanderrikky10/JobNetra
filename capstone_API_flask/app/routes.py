from app import app
from flask import request, jsonify
import tensorflow as tf
from transformers import BertTokenizer, AlbertTokenizer
import joblib
import os
import numpy as np

model_path = r"saved_model/pb/continuebyRobert_epoch_1_accuracyval_0.110_accuracytrain_0.115"
loaded_model = tf.saved_model.load(model_path)
inference_fn = loaded_model.signatures["serving_default"]

tokenizer_dir = r"saved_model/artifacts/tokenizer"
tokenizer = AlbertTokenizer.from_pretrained(tokenizer_dir)

label_encoder_path = r"saved_model/artifacts/label_encoder.pkl"
label_encoder = joblib.load(label_encoder_path)

@app.route('/')
@app.route('/index')
def index():
    return "Flask job prediction!"

# @app.route('/processing', methods=['POST'])
# @app.route('/processing/<skills>', methods=['GET'])
# def processing(skills):
#     if not skills.strip():
#         return "Error: No skills provided", 400

#     # Tokenize input
#     inputs = tokenizer(skills, return_tensors='tf', padding="max_length", truncation=True, max_length=128)
    
#     inputs_dict = {
#         "inputs": tf.cast(inputs["input_ids"], tf.int32),
#         "inputs_1": tf.cast(inputs["attention_mask"], tf.int32)
#     }

#     output = inference_fn(
#         inputs=tf.cast(inputs["input_ids"], tf.float32),
#         inputs_1=tf.cast(inputs["attention_mask"], tf.float32)
#     )

#     # Predict
#     logits = list(output.values())[0]
#     probs = tf.nn.softmax(logits, axis=1)

#     top_k = 3
#     top_probs, top_indices = tf.math.top_k(probs, k=top_k)
#     top_labels = label_encoder.inverse_transform(top_indices.numpy()[0])

#     # Format output as plain text (atau bisa juga HTML)
#     result = f"Input skills: {skills}\n\nTop predictions:\n"
#     for i in range(top_k):
#         result += f"{i+1}. {top_labels[i]} (prob: {top_probs[0][i].numpy():.4f})\n"

#     return result


@app.route('/processing', methods=['POST'])
def processing():
    data = request.get_json()

    if not data or 'skills' not in data or not data['skills'].strip():
        return jsonify({"error": "No skills provided"}), 400

    skills = data['skills']

    inputs = tokenizer(skills, return_tensors='tf', padding="max_length", truncation=True, max_length=128)

    output = inference_fn(
        inputs=tf.cast(inputs["input_ids"], tf.float32),
        inputs_1=tf.cast(inputs["attention_mask"], tf.float32)
    )

    logits = list(output.values())[0]
    probs = tf.nn.softmax(logits, axis=1)

    top_k = 3
    top_probs, top_indices = tf.math.top_k(probs, k=top_k)
    top_labels = label_encoder.inverse_transform(top_indices.numpy()[0])

    result = {
        "input_skills": skills,
        "top_predictions": [
            {"label": top_labels[i], "probability": float(top_probs[0][i].numpy())}
            for i in range(top_k)
        ]
    }

    return jsonify(result)
