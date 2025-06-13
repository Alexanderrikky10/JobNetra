import pandas as pd
from sklearn.model_selection import train_test_split


def split_data():
    df = pd.read_excel('judul_pekerjaan/pekerjaan_dan_skill_score_45.xlsx')

    df_80, df_20 = train_test_split(
        df,
        test_size=0.2,
        stratify=df["nama_pekerjaan_terbaik"],
        random_state=42
    )
    print("Distribusi label di 80%:")
    print(df_80["nama_pekerjaan_terbaik"].value_counts(normalize=True))

    print("\nDistribusi label di 20%:")
    print(df_20["nama_pekerjaan_terbaik"].value_counts(normalize=True))

    df_80.to_excel("judul_pekerjaan/data_80_persen_training.xlsx", index=False)
    df_20.to_excel("judul_pekerjaan/data_20_persen_testing.xlsx", index=False)
    return df

split_data()