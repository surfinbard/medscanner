from bs4 import BeautifulSoup
import cloudscraper
import webbrowser
import subprocess
import platform
import requests
import os

scraper = cloudscraper.create_scraper()

url_consulta = "https://consultaremedios.com.br/nitazoxanida/bula"
headers = {
    "Host": "consultaremedios.com.br",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:143.0) Gecko/20100101 Firefox/143.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Alt-Used": "consultaremedios.com.br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    "Priority": "u=0, i"
}


res_consulta = scraper.get(str(url_consulta), headers=headers)

soup = BeautifulSoup(res_consulta.content, 'html.parser')

main_content = soup.find('div', class_='leaflet-article')

if main_content:
    text = main_content.get_text(separator='\n', strip=True)
else:
    text = soup.get_text(separator='\n', strip=True)

lines = text.split('\n')
cleaned_lines = [line for line in lines if line.strip() != '®']
clean_text = '\n'.join(cleaned_lines)

print(clean_text)