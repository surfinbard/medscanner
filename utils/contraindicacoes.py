""" import requests
import sys
import os

if len(sys.argv) < 2:
    print("Usage: python script.py <path-to-file>")
    sys.exit(1)

file_path = os.path.abspath(sys.argv[1])

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

key = "xd"
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"
headers = {
    "Content-Type": "application/json"
}
body = {
  "contents": [{
    "parts":[{"text": f"O texto a seguir e uma bula. me diga quais sao as containdicacoes, os medicamentos com os quais esse tera interacoes e observacoes importantes. sua resposta deve ser em formato de dictionary. nele, tres chaves: 'contraindicacoes', 'interacoes_medicamentosas' (caso a bula diga que nao ha interacoes, retorne um array vazio para interacoes_medicamentosas) e 'observacoes'. Os valores das chaves serao arrays de strings. Conteudo da bula: {content}"}]
    }]
   }


response = requests.post(url, json=body, headers=headers)

print(response.json()['candidates'][0]['content']['parts'][0]['text'])

 """