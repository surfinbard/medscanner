import pandas as pd

# Ler arquivo XLS/XLSX
df = pd.read_excel('medlist.xls')

# Obter valores únicos (case-insensitive) de uma coluna
column_name = 'Nome do Produto'
unique_values = df[column_name].str.upper().unique()

# Converter de volta para lista
unique_list = list(unique_values)

print(unique_list)