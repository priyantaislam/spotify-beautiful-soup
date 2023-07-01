# Spotify-beautiful-soup
 The web interface lets user login with their spotify account and select a date to create a Spotify playlist containing Billboard Hot 100 of that date.

# Description
A React project with Python Flask backend utilising the spotify API. The front-end allows the user to login with their Spotify account and input a date. The date is then passed on to the backend api, where Beautiful Soup library is used to web scrape the Billboard Hot 100 website for songs and artists of that date. After that the backend uses the Spotify api to search the songs and make a playlist with them. The playlist is then displayed in the frontend which the user can interact with.

#### TO-DO

-Refactor Spotify login to authorization with PKCE\
-Fix Spotify track searching in the backend
