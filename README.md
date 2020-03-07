# Restaurant_Picker
Uses Yelp API to help users easily pick a restaurant.  Can be accessed @ https://restaurant.darcykyle.com

My main focus for this website was simplicity.  After landing at the homepage a user has three choices:
  1) "Search": Works very similar to yelp, a user will enter the type of food they are craving and will get the top 10 results.
  2) "Surprise me": The app will select a random restaurant type and show the user search results for this type.
  3) "Help me decide":  The app gets photos from local restaurants and shows the user one photo at a time (think "tinder for food"), the user can then opt to go straight to the restaurant's yelp page, or see search results for similar restaurants.  


Technical details:
  Hosted on Google App Engine 
  The site is run by a light python flask server that handles Yelp API requests and keeps the API Key hidden
 
 NOTICE:
  There are two excluded files to hide yelp and google API keys, "api_keys.py" and "config.js"
