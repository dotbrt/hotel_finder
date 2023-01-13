from fastapi import FastAPI, Request, Response
from pydantic import BaseModel, HttpUrl
from typing import Union
from bs4 import BeautifulSoup
import requests
from bs4 import BeautifulSoup as bs
import requests
from urllib import parse
import datetime
from time import sleep
import os
# from dotenv import load_dotenv giving errors
from os.path import exists


# config = load_dotenv()

# access_token = config['access_token']
DUMMY_DATA = 0

DUMMY_RESPONSE = {
    "name": "Westgate Las Vegas Resort and Casino",
    "address": "3000 Paradise Road, Las Vegas, NV 89109, United States",
    "stars": 4,
    "rating": 7.3,
    "url": "https://www.booking.com/hotel/us/las-vegas-hotel.en-gb.html"
}

app = FastAPI()
# app.secret_key = config['secret_key']
APP_ROOT = os.path.dirname(os.path.abspath(__file__))


class Hotel(BaseModel):
    name: str
    address: Union[str, None] = None
    stars: int
    rating: float
    url: HttpUrl


class Link(BaseModel):
    url: HttpUrl


def hotel_data(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9'}
    if DUMMY_DATA == 0:
        r = requests.get(url, headers=headers)
        soup = bs(r.text, 'html.parser')
    elif DUMMY_DATA == 1:
        with open('sample.txt', 'r') as f:
            r = f.read()
            soup = bs(r, 'html.parser')
    try:
        stars_group = soup.find('span', {'data-testid': 'rating-stars'})
        stars = len(stars_group.find_all('svg'))
    except Exception:
        stars = None
    address = soup.find('span', {'class': 'hp_address_subtitle'}).text.strip()
    hotel_name = soup.find('h2', {'class': 'pp-header__title'}).text
    rating = soup.find(
        'div', {'data-testid': 'review-score-right-component'}).div.text
    hotel = Hotel(name=hotel_name, address=address,
                  stars=stars, rating=rating, url=url)
    return hotel


@app.post("/api/hotel")
async def hotel(url: Link):
    return DUMMY_RESPONSE


def get_coordinates(quote):
    parsed_quote = parse.quote(quote).encode('utf-8')
    r = requests.get(
        f'https://api.mapbox.com/geocoding/v5/mapbox.places/{parsed_quote}.json?access_token={access_token}')
    relevance = r.json()['features'][0]['relevance']
    coordinates = r.json()['features'][0]['geometry']['coordinates']
    str_coordinates = ','.join(str(x) for x in coordinates)
    return str_coordinates, relevance


# def route(hotel_coords, venue_coords, access_token=access_token):
#     api_call = requests.get(
#         f'https://api.mapbox.com/directions/v5/mapbox/driving/{hotel_coords};{venue_coords}.json?access_token={access_token}')
#     time = datetime.timedelta(seconds=api_call.json()['routes'][0]['duration'])
#     dist = api_call.json()['routes'][0]['distance']/1000
#     return "{:0>8}".format(str(time)), round(dist, 2)


@ app.route('/new-project', methods=['GET', 'POST'])
def new_project():
    lname = request.args.get('lname')
    file_exists = exists(f'{APP_ROOT}/tmp/{lname}.json')
    if file_exists:
        return jsonify("File exists")
    else:
        try:
            with open(f'{APP_ROOT}/tmp/{lname}.json', 'w') as jfile:
                project = jfile.write("{}")
            return jsonify("File created")
        except Exception as e:
            print(e)
    return jsonify("error")


@ app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Get the list of URLs from the POST request
        urls = request.form.getlist('urls')
        print(urls)
        venue = request.form['venue']
        # Store the data in the session
        session['urls'] = urls
        session['venue'] = venue
        # Initialize an empty list to store the dictionaries for each hotel
        hotel_dataset = []
        # Iterate through the list of URLs
        for url in urls:
            # Make an HTTP GET request to the URL
            hotel = hotel_data(url)

            # Extract the desired information from the page
            name = hotel[0]
            address = hotel[1]
            hotel_coord = get_coordinates(hotel[1])[0]
            venue_coord = get_coordinates(venue)[0]
            if DUMMY_DATA == 0:
                dist = route(hotel_coord, venue_coord)
            elif DUMMY_DATA == 1:
                dist = ('0:06:14.292000', 2.03)
            stars = hotel[2]
            rating = hotel[3]
            time = dist[0]
            distance = dist[1]

            # Create a dictionary with the extracted information
            hotel = {
                'name': name,
                'address': address,
                'stars': stars,
                'rating': rating,
                'distance': distance,
                'time': time,
                'url': url
            }

            # Add the dictionary to the list
            hotel_dataset.append(hotel)

        # Render the template with the extracted data
        return render_template('index.html', hotel_dataset=hotel_dataset)

    # If the request is a GET request, just render the template
    projects = os.listdir(f'{APP_ROOT}/tmp')
    return render_template('index.html', projects=projects)


if __name__ == '__main__':
    app.run()
