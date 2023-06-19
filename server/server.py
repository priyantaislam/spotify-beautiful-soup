from flask import Flask, request
from bs4 import BeautifulSoup
import requests
from dotenv import load_dotenv
import json

app = Flask(__name__)
load_dotenv()

#global variables
token = ""
USER_ID = ""

def get_user_id():
    global USER_ID
    headers = {
    'Authorization': 'Bearer ' + token
    }   

    url = f'https://api.spotify.com/v1/me'

    response = requests.get(url, headers=headers)
    data = response.json()  # Convert response content to JSON

    USER_ID = data['id']
    print(USER_ID)

def spotify_search(song, artist):
    headers = {
    'Authorization': 'Bearer ' + token
    }   
    
    formatted_song = song.replace(" ", "%20")
    formatted_artist = artist.replace(" ", "%20")
    url = f'https://api.spotify.com/v1/search?q=%2520track%3A{formatted_song}%2520artist%3A{formatted_artist}&type=track&limit=1&offset=0'

    response = requests.get(url, headers=headers)
    data = response.json()  # Convert response content to JSON

    try:
        track_id = data['tracks']['items'][0]['id']
        return track_id  
    except (KeyError, IndexError, requests.exceptions.RequestException) as e:
        print(f"An error occurred: {e}")
        return "ERROR"

def create_playlist(date):
    global USER_ID

    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }  

    auth_parameters = {
        "name": "Billboard Hot 100 " + date,
        "public": "false",
        "collaborative": "false",
        "description": "Billboard Hot 100"
    }

    url = f'https://api.spotify.com/v1/users/{USER_ID}/playlists'

    response = requests.post(url, data=json.dumps(auth_parameters), headers=headers)
    data = response.json()

    #handle
    if response.status_code == 201:
        # Request was successful
        print('POST request succeeded')
        return data['id']
    else:
        # Request failed
        print('POST request failed')
        print(response.content)
        return "ERROR"

def add_tracks(playlist_id, tracks):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }  

    body = {
        "uris": tracks 
    }

    url = f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'

    response = requests.post(url, data=json.dumps(body), headers=headers)
    data = response.json()

    #handle
    if response.status_code == 201:
        # Request was successful
        print('POST request succeeded')
        print('tracks added')
    else:
        # Request failed
        print('POST request failed')
        print(response.content)

@app.route("/playlist/<string:date>")
def playlist(date):
    global token
    playlist_id = ""
    # Set token from Authorization header of the incoming request
    token = request.headers.get('Authorization').split()[1]

    #making a request to Billboard website to get hot 100 in a particular week
    response = requests.get("https://www.billboard.com/charts/hot-100/{}".format(date))
    web_page = response.text

    #reading webpage content
    soup = BeautifulSoup(web_page, "html.parser")

    rows = soup.find_all(class_="o-chart-results-list-row-container")

    get_user_id()
    playlist_id = create_playlist(date)
    
    #print(playlist_id)
    tracks = []
    #parsing song and the artist from web content
    count = 0
    for row in rows:
        song_tag = row.find("ul").find("h3")
        song = song_tag.string.strip()
        artist = song_tag.parent.find("span").string.strip()
        song_id = spotify_search(song, artist)
        if(song_id == "ERROR"):
            continue
        tracks.append("spotify:track:" + song_id)
    
    add_tracks(playlist_id, tracks)
    return {"playlist_id": playlist_id}

if __name__=="__main__":
    app.run(debug=True)