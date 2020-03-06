//search.js holds the functions responsible for preforming a food search, the "surprise me" button, and the loading gif

// Displays the loading gif whenever the website is loading
window.addEventListener("load", function () {
        const loader = document.querySelector(".loader");
        loader.className += " hidden";
    });

/* search() function modeled from w3schools.com: https://www.w3schools.com/html/html5_geolocation.asp
* Function will get the users location, then call upon the sendData function if successful */
function search(search_url="/search?", search_value=document.getElementById('search_value').value) {
    // Displays loading screen
    const loader = document.querySelector(".loader");
    loader.className = "loader";
    // Checks for location cookies
    let lat = getCookie("lat");
    let long = getCookie("long");
    // if Cookies found
    if (lat !== "" && long !== "" ) {
        sendData({'lat': lat, 'long': long}, search_url, search_value, true)
    }
    // if Cookies not found
    else {
        // Getting location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                sendData(position, search_url, search_value);
            }, function() {
                location_error(search_url, search_value)
            });
        } else {
            location_error(search_url, search_value);
        }
    }
}

function location_error(search_url, search_value) {
    let zip = prompt("Geolocation could not be determined\n\nPlease enter you zip code:");
    let xhr = $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + zip + '&key=' + config['GOOGLE_API_KEY']);
    xhr.done(function(data) {
        position = {
            'lat': data.results[0].geometry.location.lat,
            'long': data.results[0].geometry.location.lng,
        };
        sendData(position, search_url, search_value, true)
    })
}

/*
* Called by the search() function, sendData() will send a GET request with the users's search term, location, and
* desired url.
* */
function sendData(position, url, search_value, location_cookie=false) {
    if (location_cookie === false) {
        var lat = position.coords.latitude; //Gets users location
        var long = position.coords.longitude;
    }
    else {
        var lat = position['lat'];
        var long = position['long'];
    }
    // Setting a cookie with location
    let inTwentyMinutes = new Date(new Date().getTime() + 15 * 60 * 1000); // expires in 15 minutes
    document.cookie="lat=" + lat.toString() + "; expires=" + inTwentyMinutes.toUTCString();
    document.cookie="long=" + long.toString() + "; expires=" + inTwentyMinutes.toUTCString();
    // Sending the get request
    let data = {"lat": lat, "long": long, "search_value": search_value};
    let queryString = $.param(data);
    window.location.replace(url + queryString);
}

/*
* called by the "Surprise me" button, function picks a random restaurant type from the list below and calls the
* search function with that value.
*/
function surprise_me() {
    let food_types = ["Mexican", "Chinese", "Seafood", "Asian", "Italian", "Fast Food", "Diner", "Steakhouse"];
    let choice = food_types[Math.floor(Math.random() * food_types.length)];
    document.getElementById('search_value').value = choice;
    search();
}

// Function from https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
    }
    return "";
}