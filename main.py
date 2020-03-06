from flask import Flask, render_template, request
from yelp_api import search_business, get_biz_locations
from api_keys import get_google_api

app = Flask(__name__)


# Restaurant main page
@app.route('/')
def index():
    return render_template('search.html', results=search)


# Restaurant search function
@app.route("/search")
def search():
    search_args = request.args  # Search arguments
    location = {
        'lat': search_args['lat'],
        'long': search_args['long']
    }
    # Gets search results from yelp's api
    businesses = search_business(search_args['search_value'], search_args['lat'], search_args['long'])
    # Calls the search_results function to render the results page
    if len(businesses) == 0:
        return search_results(businesses, location, no_results=True)
    else:
        biz_locations = get_biz_locations(businesses)
        return search_results(businesses, location, biz_locations, search_value=search_args['search_value'])


# Returns search results page
@app.route('/results')
def search_results(businesses, location, biz_locations=[], no_results=False, search_value=""):
    return render_template("results.html", search_value=search_value, businesses=businesses, location=location,
                           biz_locations=biz_locations, no_results=no_results, google_api_key=get_google_api())


# Function displays a slides show of food pictures from nearby restaurants, when the user find a food that they like
# they have the option to either go the that specific restaurant's yelp page, or search for similar food
@app.route('/show_food')
def show_food():
    search_args = request.args
    businesses = search_business("Restaurants", search_args['lat'], search_args['long'], limit=50)
    photo_urls = [biz["image_url"] for biz in businesses]
    yelp_urls = [biz["url"] for biz in businesses]
    categories = [biz["categories"][0]['title'] for biz in businesses]
    return render_template('view_food.html', categories= categories, photo_urls=photo_urls, yelp_urls=yelp_urls)


if __name__ == '__main__':
    app.run()
