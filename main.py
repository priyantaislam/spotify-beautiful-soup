from bs4 import BeautifulSoup
import requests

response = requests.get("https://www.billboard.com/charts/hot-100/2000-08-12/")
web_page = response.text

#reading webpage content
soup = BeautifulSoup(web_page, "html.parser")
