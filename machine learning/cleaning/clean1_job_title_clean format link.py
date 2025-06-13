import os

import pandas as pd
from sentence_transformers import SentenceTransformer
import re

#  Membaca dataset job_skills.csv
df_skill = pd.read_csv("job_skills.csv", sep=",")
# print(df_skill)

# Membuat atribut "job_slug" untuk menyimpan "job_link" yang sudah diextract dengan mengambil semua setelah /view/
df_skill["job_slug"] = df_skill["job_link"].str.extract(r'/view/(.+)')
print(df_skill["job_slug"])


# Proses pembersihan atribut "job_slug"
def clean_link_title(text):
    # Buang angka
    text = re.sub(r'\d+', '', text)
    # Replace -at- jadi spasi
    text = text.replace('-at-', ' ')
    # Replace - jadi spasi
    text = text.replace('-', ' ')
    # Hilangkan double spasi
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


# Buat atribut "clean_title" dan panggil fungsi "def clean_link_title" yang telah dibuat sebelumnya untuk melakukan prosese pembersihan
df_skill['clean_title'] = df_skill['job_slug'].apply(clean_link_title)

# Simpan hasil ke dalam format csv dengan nama "pekerjaan"
df_skill.to_csv('pekerjaan.csv', index=False)