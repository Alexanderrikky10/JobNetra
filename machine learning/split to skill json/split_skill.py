import pandas as pd
import json

print("Proses membaca data ...")
df = pd.read_excel('judul_pekerjaan/pekerjaan_dan_skill_score_45.xlsx')

print("Proses pemisahan atribut skill pada data ...")
column_skill = df['skill']
print(column_skill.head())

unique_skills = set()

print("Memulai proses pemisahan skill ...")
for i in column_skill:
    if pd.isna(i):
        continue 
    if isinstance(i, str):
        skills = i.split(',')
        for skill in skills:
            cleaned_skill = skill.strip()
            if ':' in cleaned_skill:
                cleaned_skill = cleaned_skill.split(':')[0].strip()
            unique_skills.add(cleaned_skill)

unique_skill= list(unique_skills)

print("membuang skill unik dan aneh...")
df_skill = pd.DataFrame(unique_skill, columns=['skill'])
df_skill.drop_duplicates(inplace=True)
df_skill = df_skill[~df_skill['skill'].str.contains('""', na=False)]
df_skill = df_skill.dropna(subset=['skill'])
df_skill.reset_index(drop=True, inplace=True)

print("Membuat ke file json ...")
json_data = { "skills": df_skill['skill'].tolist()}
json_string = json.dumps(json_data, indent=2)

with open("split to skill json/dataset_skill.json", "w") as json_file:
    json_file.write(json_string)