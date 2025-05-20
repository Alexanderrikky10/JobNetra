import pandas as pd

# Membuang data yang memiliki similarity_score >= 0.45 
# Membuang data yang memiliki skill dan nama pekerjaan yang sama
def clean_job_duplicated():
    df_skill = pd.read_excel("judul_pekerjaan/pekerjaan_dan_skill_fix.xlsx")
    print(df_skill.head())
    df_skill_45 = df_skill[df_skill["similarity_score"] >= 0.45]
    df_skill_45 = df_skill_45.drop_duplicates(subset=["skill", "nama_pekerjaan"])

    # Simpan hasil ke "judul_pekerjaan/pekerjaan_dan_skill_score_45.xlsx"
    df_skill_45.to_excel("judul_pekerjaan/pekerjaan_dan_skill_score_45.xlsx", index=False)


clean_job_duplicated()