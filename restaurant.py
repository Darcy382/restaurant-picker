import requests
from api_keys import get_yelp_api

# Gets information from the Yelp Fusion API

# Define the API Key the Endpoint, and header
API_KEY = get_yelp_api()  # Keeps the api key hidden
ENDPOINT = "https://api.yelp.com/v3/businesses/search"
HEADERS = {"Authorization": "bearer {}".format(API_KEY)}


def search_business(term, lat, long, limit=10, radius=10000):
    parameters = {'radius': radius, 'term': term, "latitude": lat, "longitude": long, "limit": limit}
    response = requests.get(url=ENDPOINT, params=parameters, headers=HEADERS)
    business_data = response.json()  # Convert JSON string to a Dict
    return business_data


def get_biz_locations(business):
    business_locations = []
    for business in business:
        business_locations.append([business['name'], business['coordinates']['latitude'], business['coordinates']['longitude']])
    return business_locations

