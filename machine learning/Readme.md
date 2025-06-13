# ⚙️ Instalasi

1. Download versi python 3.11 karena semua library yang dipakai telah disesuaikan dengan versi python 3.11
https://www.python.org/downloads/release/python-3110/
2. Install python 3.11 yang sudah di download
3. Download folder dataset di google drive ([🔗 klik disini](https://drive.google.com/drive/folders/1vyMwxaDQUc3AuYioO2ftfXETAaHUcGDg?usp=sharing)) anda dapat hanya mendownload file yang masih kurang **JANGAN MENGGANTI NAMA FOLDER ATAU FILE DIDALAMNYA**
4. Download folder model di google drive ([🔗 klik disini](https://drive.google.com/drive/folders/1imVT2aKXLDB017Jm0YTHeqOJmURaL91A?usp=sharing)) anda dapat hanya mendownload file yang masih kurang **JANGAN MENGGANTI NAMA FOLDER ATAU FILE DIDALAMNYA**
5. Paste folder dataset dan model tersebut sesuai dengan format direktori ([Lihat Struktur Direktori](#-struktur-direktori)) dan sesuaikan kembali semua struktur direktori agar tidak terjadi error
6. Buat env local
   - Buka Command Palette dengan menekan Ctrl+Shift+P.
   - Ketik dan pilih Python: Select Interpreter.
   - Pilih versi python 3.11 dan lakukan proses pembuatan env
   - Jika sudah, ketik di terminal **.venv\Scripts\activate**
7. Install semua library dengan perintah "pip install -r requirements.txt"
8. Masuk ke folder **training model/training_model_albert.py** kemudian klik run di pojok kanan atas.


# Format Folder
## 📁 Struktur Direktori

```
📁 machine-learning/
│
├── 📁 cleaning/
|   ├── 📄 clean1_job_title_clean format link.py
|   ├── 📄 clean2_job_title_embending similarity job.py
|   ├── 📄 clean3_job_title_drop duplicated.py
|   ├── 📄 job_tilte_embeddings.pt
│   ├── 📄 job_descriptions.csv
│   ├── 📄 job_skills.csv
│   └── 📄 pekerjaan.csv
│
├── 📁 judul_pekerjaan/
|   ├── 📄 data_20_persen_testing.xlsx
|   ├── 📄 data_80_persen_training.xlsx
|   ├── 📄 pekerjaan_dan_skill_fix - BACKUP - 01 - original.csv
|   ├── 📄 pekerjaan_dan_skill_fix - BACKUP - 02 - sebelum cleaning manual.csv
|   ├── 📄 pekerjaan_dan_skill_fix - BACKUP - 03 - hasil convert pekerjaan_dan_skill_fix.csv
│   ├── 📄 pekerjaan_dan_skill_fix.csv
│   ├── 📄 pekerjaan_dan_skill_fix.xlsx
│   ├── 📄 pekerjaan_dan_skill_score_45 - PIVOT TABLE.xlsx
│   ├── 📄 pekerjaan_dan_skill_score_45.xlsx
│   ├── 📄 try_pekerjaan_dan_skill_score_45.xlsx
│   └── 📄 try2_pekerjaan_dan_skill_score_45.xlsx
│
├── 📁 model/
|   ├── 📁 model_alebert_base_v2
|   |   ├── (file/folder model_albert_base_v2)
|   |   └── ...
|   ├── 📁 model_bert_uncased
|   |   ├── (file/folder model_bert_uncased)
|   |   └── ...
|   ├── 📁 model_text2text_generation_answer
|   |   ├── (file/folder model_text2text_generation_answer)
|   |   └── ...
|   └── 📁 model_text2text_generation_questions
|       ├── (file/folder model_text2text_generation_questions)
|       └── ...
│
├── 📁 training model/
|   ├── 📄 hunggingface.py
|   ├── 📄 split_data.py
|   ├── 📄 training_model_albert.py
|   ├── 📄 training_model_bert.py
|   ├── 📄 try_create_dummydata.py
|   └── 📄 try_inference_dummydata.py
│
├── 📄 Readme.md
├── 📄 jobnetra proses ML.docx
└── 📄 requirements.txt
```

## 📌 Keterangan
### 📁 /cleaning
- Kumpulan dataset selama proses cleaning.
  - **job_skills.csv** = dataset awal untuk proses cleaning.
  - **pekerjaan.csv** = dataset setelah proses cleaning awal dilakukan.
  - **job_descriptions.csv** = dataset nama-nama pekerjaan.
- **.../clean1_job_title_clean format link.py** = Proses pembersihan dataset.
- **.../clean2_job_title_embending similarity job.py** = Proses pembuatan similarity judul.
- **.../clean3_job_title_drop duplicated.py** = Proses membuang data duplikat.
---

### 📁 /judul_pekerjaan
- Tempat penyimpanan seluruh proses dataset pekerjaan dan skill dengan format **.csv**/**.xlsx**.
- Seluruh proses dataset hasil cleaning akan disimpan di folder ini.
---

### 📁 /model
- Tempat penyimpanan model yang sudah di download untuk digunakan ketika traning.
---

### 📁 /training model
- Proses perancangan download model bert.
- Proses perancangan model.
- Proses perancangan dan testing (inference) menggunakan data dummy.
---

# ℹ️ Informasi Lain
Semangat :)