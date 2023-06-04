from flask import Flask
from bs4 import BeautifulSoup
import os
import requests
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

#global variables
token = ""

def get_spotify_token():
    global token
    url = "https://accounts.spotify.com/api/token"

    #get auth credentials from env
    CLIENT_ID = os.getenv("CLIENT_ID")
    CLIENT_SECRET = os.getenv("CLIENT_SECRET")
    
    #set up body for post request
    auth_parameters = {
      'body': 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    #set the header
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    #sending a POST request to spotify endpoint
    response = requests.post(url, data=auth_parameters['body'], headers=headers)

    #handle
    if response.status_code == 200:
        # Request was successful
        print('POST request succeeded')

        response_data = response.json()
        access_token = response_data.get('access_token')

        if access_token:
            print('Access Token:', access_token)
            token = access_token
        else:
            print('Access Token not found in response')
    else:
        # Request failed
        print('POST request failed')

def spotify_search(song, artist):
    headers = {
    'Authorization': 'Bearer ' + token
    }   
    
    formatted_song = song.replace(" ", "%20")
    formatted_artist = artist.replace(" ", "%20")
    url = f'https://api.spotify.com/v1/search?q=%2520track%3A{formatted_song}%2520artist%3A{formatted_artist}&type=track&limit=1&offset=0'

    response = requests.get(url, headers=headers)
    data = response.json()  # Convert response content to JSON

    track_id = data['tracks']['items'][0]['id']
    return track_id

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
        song = row.find("ul").find("h3").string.strip()
        artist = row.find("ul").find_all("span")[1].string.strip()
        song_id = spotify_search(song, artist)
        playlist.append(song_id)
        
    return {"songs": playlist}

if __name__=="__main__":
    get_spotify_token()
    app.run(debug=True)