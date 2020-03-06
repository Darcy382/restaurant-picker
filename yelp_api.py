import requests
from api_keys import get_yelp_api

# Gets information from the Yelp Fusion API

# Define the API Key the Endpoint, and header
API_KEY = get_yelp_api()  # Keeps the api key hidden
ENDPOINT = "https://api.yelp.com/v3/businesses/search"
HEADERS = {"Authorization": "bearer {}".format(API_KEY)}


# Recursive function that gets bossiness data from the yelp fusion api.  If less than 7 results are found within 10km,
# the function will resend the get request with a new radius of + 5km, the recursion process will repeat until
# the radius is greater than 35km
def search_business(term, lat, long, limit=10, radius=10000):
    parameters = {'radius': radius, 'term': term, "latitude": lat, "longitude": long, "limit": limit}
    response = requests.get(url=ENDPOINT, params=parameters, headers=HEADERS)
    businesses = response.json()['businesses']  # Convert JSON string to a Dict
    if radius > 35000:
        return businesses
    elif len(businesses) < 7:
        return search_business(term, lat, long, limit=10, radius=radius + 5000)
    else:
        return businesses


# Takes business search results and returns a list of just the business locations
def get_biz_locations(business):
    business_locations = []
    for business in business:
        business_locations.append([business['name'], business['coordinates']['latitude'],
                                   business['coordinates']['longitude']])
    return business_locations
