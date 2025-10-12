import pandas as pd

# Caminho do arquivo Excel (.xls)
arquivo_excel = 'medlist.xls'       # <- substitua pelo nome do seu arquivo
nome_da_planilha = None              # ou defina como 'Página1', por exemplo
arquivo_csv_saida = 'meds.csv'

# Lê o Excel (primeira aba por padrão, ou informe a aba)
df = pd.read_excel(arquivo_excel)

# Converte e salva como CSV (com vírgulas)
df.to_csv(arquivo_csv_saida, index=False)

print(f'Arquivo convertido com sucesso: {arquivo_csv_saida}')