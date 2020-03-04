/*
* search.js holds the functions responsible for preforming a food search, the "surprise me" button, and the loading gif
* */

// Displays the loading gif whenever the website is loading
window.addEventListener("load", function () {
        const loader = document.querySelector(".loader");
        loader.className += " hidden";
    });

/*
* search() function modeled from w3schools.com: https://www.w3schools.com/html/html5_geolocation.asp
*
* Function will get the users location, then call upon the sendData function if successful
* */
function search(search_url="/search?", search_value=document.getElementById('search_value').value) {
    // Displays loading screen
    const loader = document.querySelector(".loader");
    loader.className = "loader";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            sendData(position, search_url, search_value);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

/*
* Called by the search() function, sendData() will send a GET request with the users's search term, location, and
* desired url.
* */
function sendData(position, url, search_value) {
    let lat = position.coords.latitude; //Gets users location
    let long = position.coords.longitude;
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