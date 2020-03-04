from flask import Flask, render_template, request
from yelp_api import search_business, get_biz_locations
from api_keys import get_google_api

app = Flask(__name__)


@app.route('/')  # Restaurant main page
def index():
    return render_template('search.html', results=search)


@app.route("/search")  # Restaurant search
def search():
    search_args = request.args  # Search arguments
    location = {
        'lat': search_args['lat'],
        'long': search_args['long']
    }
    # Gets search results from yelp's api
    results = search_business(search_args['search_value'], search_args['lat'], search_args['long'])
    if len(results['businesses']) == 0:
        return search_results(results, location, no_results=True)
    else:
        biz_locations = get_biz_locations(results["businesses"])
        return search_results(results, location, biz_locations, search_value=search_args['search_value'])


@app.route('/results')  # Returns restaurant search results
def search_results(results, location, biz_locations=None, no_results=False, search_value=""):
    return render_template("results.html", search_value=search_value, results=results, location=location,
                           biz_locations=biz_locations, no_results=no_results, google_api_key=get_google_api())


@app.route('/show_food')
def show_food():
    search_args = request.args
    results = search_business("Restaurants", search_args['lat'], search_args['long'], limit=50)
    photo_urls = [biz["image_url"] for biz in results["businesses"]]
    yelp_urls = [biz["url"] for biz in results["businesses"]]
    categories = [biz["categories"][0]['title'] for biz in results["businesses"]]
    return render_template('view_food.html', categories= categories,
                           results=results, photo_urls=photo_urls, yelp_urls=yelp_urls)

if __name__ == '__main__':
    app.run()
