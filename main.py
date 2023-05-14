from bs4 import BeautifulSoup
import os
import requests

#making a request to Billboard website to get hot 100 in a particular week
response = requests.get("https://www.billboard.com/charts/hot-100/2000-08-12/")
web_page = response.text

#reading webpage content
soup = BeautifulSoup(web_page, "html.parser")

rows = soup.find_all(class_="o-chart-results-list-row-container")

for row in rows:
    song = row.find("ul").find("h3").string
    artist = row.find("ul").find_all("span")[1].string
    print(song + " by " + artist)



