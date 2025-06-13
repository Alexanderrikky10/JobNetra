# from transformers import BertTokenizer, TFBertModel

# save_directory = "model/model_bert_uncased"

# # Simpan model
# model = TFBertModel.from_pretrained("bert-base-uncased")
# model.save_pretrained(save_directory)

# # simpan tokenizer
# tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
# tokenizer.save_pretrained(save_directory)

from transformers import AlbertTokenizer, TFAlbertModel

save_directory = "model/model_albert_base_v2"

# Load dan simpan model
model = TFAlbertModel.from_pretrained("albert-base-v2")
model.save_pretrained(save_directory)

# Load dan simpan tokenizer
tokenizer = AlbertTokenizer.from_pretrained("albert-base-v2")
tokenizer.save_pretrained(save_directory)
