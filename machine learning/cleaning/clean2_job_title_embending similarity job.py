import os
os.environ["TRANSFORMERS_NO_TF"] = "1"

import pandas as pd
from sentence_transformers import SentenceTransformer, util
import torch

# Model 'all-MiniLM-L6-v2', penggunaan model ini dikarenakan model ini cukup ringan dan didalamnya sudah terdapat tokonization, embedding layer, transformer layer (memahami konteks, urutan, dan makna teks) sehingga cocok untuk kasus ini yang mencocokkan artribut link yang sudah dibersihkan untuk diubah menjadi nama-nama pekerjaan berdasarkan dataset nama pekerjaan.
model = SentenceTransformer('all-MiniLM-L6-v2')

# Load data pekerjan yang telah digunakan sebelumnya
df_skill = pd.read_csv("pekerjaan.csv", sep=",")
# Load dataset nama-nama pekerjaan yang digunakan nantinya untuk mencari similarity berdasarkan nama pekerjaan pada file pekerjaan
df_job = pd.read_csv("job_descriptions.csv", sep=",")

# Proses embedding job titles menggunakan model 'all-MiniLM-L6-v2' dan save/simpan ke file .pt (pytorch format, file ini lebih cepat dibaca dibanding save ke file csv)
link_titles = df_skill["clean_title"].tolist()[:100]
job_titles = df_job["Job Title"].tolist()

print("Encoding job titles...")
job_title_embeddings = model.encode(job_titles, convert_to_tensor=True, batch_size=128, show_progress_bar=True)
torch.save(job_title_embeddings, "job_title_embeddings.pt")

# Load job title embeddings yang sudah disimpan
print("Loading pre-encoded job titles...")
job_title_embeddings = torch.load("job_title_embeddings.pt")
job_titles = df_job["Job Title"].tolist()

# Buat variabel file output dan buat ukuran batch (banyak data untuk sekali proses) untuk digunakan. Tujuan batch_size agar tidak mengonsumsi banyak memori
output_file = "judul_pekerjaan/pekerjaan_dan_skill_fix.csv"
batch_size = 100

# Aktifkan cell ini hanya jika anda ingin memulai ulang prosess dari 0 karena pada bagian ini akan membuang file "pekerjaan_dan_skill_fix.csv" dan membuat ulang file baru tersebut sehingga isinya kosong.
# if os.path.exists(output_file):
#     os.remove(output_file)
#     print(f"File lama dihapus: {output_file}")

# Looping per-batch untuk proses mencari simmilarity/judul perkerjaan yang paling cocok
for start_idx in range(1048575, len(df_skill), batch_size):
    end_idx = min(start_idx + batch_size, len(df_skill))
    print(f"\nProcessing batch {start_idx} to {end_idx}")

    # Ambil subset data
    batch_df = df_skill.iloc[start_idx:end_idx]
    link_titles = batch_df["clean_title"].tolist()

    # Melakukan encoding lagi link titles
    link_title_embeddings = model.encode(link_titles, convert_to_tensor=True, batch_size=128, show_progress_bar=True)

    # Cosine similarity berdasarkan encoding pada "link_title_embeddings" dan encoding pada .pt yang sudah diload sebelumnya
    cosine_scores = util.cos_sim(link_title_embeddings, job_title_embeddings)
    top_match_indices = cosine_scores.argmax(dim=1)
    similarity_scores = cosine_scores.max(dim=1).values

    # Simpan results
    results = []
    for idx, title in enumerate(link_titles):
        best_idx = top_match_indices[idx].item()
        similarity = similarity_scores[idx].item()
        best_title = job_titles[best_idx]
        skill = batch_df.iloc[idx]['job_skills']
        
        results.append({
            'nama_pekerjaan': title,
            'skill': skill,
            'nama_pekerjaan_terbaik': best_title,
            'similarity_score': similarity
        })

    df_results = pd.DataFrame(results)

    # Append to CSV (tanpa header jika sudah ada file sebelumnya)
    # if os.path.exists(output_file):
    #     df_results.to_csv(output_file, mode='a', header=False, index=False)
    # else:
    #     df_results.to_csv(output_file, mode='w', header=True, index=False)

    write_mode = 'a' if os.path.exists(output_file) else 'w'
    df_results.to_csv(output_file, mode=write_mode, header=(write_mode == 'w'), index=False)
print("\n Semua batch selesai diproses.")
