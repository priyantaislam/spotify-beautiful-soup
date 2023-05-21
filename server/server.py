from flask import Flask
from bs4 import BeautifulSoup
import re
import requests

app = Flask(__name__)

@app.route("/playlist/<string:date>")
def playlist(date):
    #making a request to Billboard website to get hot 100 in a particular week
    response = requests.get("https://www.billboard.com/charts/hot-100/{}".format(date))
    web_page = response.text

    #reading webpage content
    soup = BeautifulSoup(web_page, "html.parser")

    rows = soup.find_all(class_="o-chart-results-list-row-container")

    playlist = []
    #parsing song and the artist from web content
    for row in rows:
        song = row.find("ul").find("h3").string
        artist = row.find("ul").find_all("span")[1].string
        entry = song.strip() + " by " + artist.strip()
        playlist.append(entry)
    return {"songs": playlist}

if __name__=="__main__":
    app.run(debug=True)