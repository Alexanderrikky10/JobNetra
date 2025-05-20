import pandas as pd
import os
# Jalankan pipeline utama kamu

def create_dummy_data():
    data = {
        'skill': [
        ["python", "data analysis", "pandas"],
        ["javascript", "react"],
        ["accounting", "excel", "finance"],
        ["python", "keras", "deep learning", "tensorflow", "ai"],
        ["photoshop", "illustrator", "design"],
        ["python", "machine learning", "numpy", "data science"],
        ["javascript", "vue", "frontend"],
        ["accounting", "quickbooks", "taxation", "audit", "ledger"],
        ["python", "pytorch", "ai", "ml"],
        ["photoshop", "canva", "graphics", "branding"],
        ["python", "deep learning", "tensorflow", "pandas", "scikit-learn"],
        ["javascript", "angular", "web"],
        ["accounting", "auditing", "ledger", "taxation"],
        ["python", "scikit-learn", "ml", "data visualization"],
        ["photoshop", "sketch", "branding"],
        ["python", "ai", "data science", "statistics"],
        ["javascript", "nodejs", "backend", "express"],
        ["accounting", "budgeting", "finance"],
        ["python", "tensorflow", "neural networks"],
        ["photoshop", "indesign", "editing", "vector"],
        ["python", "machine learning", "matplotlib", "data cleaning"],
        ["javascript", "html", "css"],
        ["accounting", "payroll", "bookkeeping"],
        ["python", "data visualization", "seaborn", "matplotlib"],
        ["photoshop", "adobe", "digital art", "illustration"]
        ],
        'nama_pekerjaan_terbaik': [
            "Data Scientist",
            "Frontend Developer",
            "Accountant",
            "ML Engineer",
            "Graphic Designer",
            "Data Scientist",
            "Frontend Developer",
            "Accountant",
            "ML Engineer",
            "Graphic Designer",
            "Data Scientist",
            "Frontend Developer",
            "Accountant",
            "ML Engineer",
            "Graphic Designer",
            "Data Scientist",
            "Frontend Developer",
            "Accountant",
            "ML Engineer",
            "Graphic Designer",
            "Data Scientist",
            "Frontend Developer",
            "Accountant",
            "ML Engineer",
            "Graphic Designer"
        ]
    }
    df = pd.DataFrame(data)
    return df

# Simpan dummy ke file 
df_dummy = create_dummy_data()
df_dummy.to_excel("judul_pekerjaan/try_pekerjaan_dan_skill_score_45.xlsx", index=False)
print("Dummy data berhasil dibuat dan disimpan di: judul_pekerjaan/try_pekerjaan_dan_skill_score_45.xlsx")
print("Jumlah data dummy:", len(df_dummy))
print("Kolom:", df_dummy.columns.tolist())