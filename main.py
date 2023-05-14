from bs4 import BeautifulSoup
import re
import requests

date_pattern = re.compile(r'^\d{4}-\d{2}-\d{2}$')

date = input("Please enter a date in yyyy-mm-dd format: ")

while not date_pattern.match(date):
    date = input("Invalid format. Please enter a date in yyyy-mm-dd format: ")

#making a request to Billboard website to get hot 100 in a particular week
response = requests.get("https://www.billboard.com/charts/hot-100/" + date)
web_page = response.text

#reading webpage content
soup = BeautifulSoup(web_page, "html.parser")

rows = soup.find_all(class_="o-chart-results-list-row-container")

#parsing song and the artist from web content
for row in rows:
    song = row.find("ul").find("h3").string
    artist = row.find("ul").find_all("span")[1].string
    entry = song.strip() + " by " + artist.strip()
    print(entry)



