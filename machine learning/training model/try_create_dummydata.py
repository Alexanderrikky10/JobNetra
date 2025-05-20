import pandas as pd
import os
# Jalankan pipeline utama kamu

def create_dummy_data():
    data = {
        'skill': [
            # === Backend Developer ===
            ["java", "spring", "backend"],
            ["python", "flask", "api", "rest"],
            ["java", "microservices", "kafka"],
            ["nodejs", "api", "express"],
            ["golang", "grpc", "backend", "concurrency"],
            
            # === Frontend Developer ===
            ["html", "css", "javascript", "responsive design"],
            ["typescript", "react", "redux"],
            ["javascript", "nextjs", "tailwind"],
            ["vue", "vuetify", "component design"],
            ["svelte", "html", "css", "frontend"],
            
            # === Data Analyst ===
            ["r", "statistics", "data wrangling", "ggplot2"],
            ["excel", "bookkeeping", "tax calculation"],
            ["python", "streamlit", "dashboard"],
            ["powerbi", "data modeling", "reporting"],
            ["sql", "data cleaning", "data analysis"],
            
            # === Graphic Designer ===
            ["adobe xd", "ui design", "prototyping"],
            ["figma", "typography", "layout"],
            ["illustrator", "vector art", "branding"],
            ["photoshop", "poster design", "retouching"],
            ["coreldraw", "logo", "print design"],
            
            # === ML Engineer ===
            ["python", "nlp", "transformer", "bert"],
            ["python", "openCV", "image processing"],
            ["python", "data mining", "etl", "big data"],
            ["python", "recommender systems", "pandas"],
            ["python", "unsupervised learning", "clustering"],
            
            # === Financial Analyst ===
            ["financial modeling", "excel", "forecasting"],
            ["finance", "cost analysis", "profitability"],
            ["accounting", "erp", "journal entry"],
            ["budgeting", "investment analysis", "valuation"],
            ["tax planning", "spreadsheet", "financial reporting"]
        ],
        'nama_pekerjaan_terbaik': [
            "Backend Developer",
            "Backend Developer",
            "Backend Developer",
            "Backend Developer",
            "Backend Developer",
            
            "Frontend Developer",
            "Frontend Developer",
            "Frontend Developer",
            "Frontend Developer",
            "Frontend Developer",
            
            "Data Analyst",
            "Data Analyst",
            "Data Analyst",
            "Data Analyst",
            "Data Analyst",
            
            "Graphic Designer",
            "Graphic Designer",
            "Graphic Designer",
            "Graphic Designer",
            "Graphic Designer",
            
            "ML Engineer",
            "ML Engineer",
            "ML Engineer",
            "ML Engineer",
            "ML Engineer",
            
            "Financial Analyst",
            "Financial Analyst",
            "Financial Analyst",
            "Financial Analyst",
            "Financial Analyst"
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