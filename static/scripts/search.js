window.addEventListener("load", function () {
        const loader = document.querySelector(".loader");
        loader.className += " hidden"; // class "loader hidden
    });

function displayLoader() {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden
}

// Search() function taken from w3schools.com, sends the users location to sendData
function search(search_url="/search?", search_value=document.getElementById('search_value').value) {
    const loader = document.querySelector(".loader");  // Displays loading screen
    loader.className = "loader"; // class "loader hidden
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let url = search_url;
            sendData(position, url, search_value);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Sends a GET request with the users's search term and location
function sendData(position, url, search_value) {
    let lat = position.coords.latitude; //Gets users location
    let long = position.coords.longitude;
    let data = {"lat": lat, "long": long, "search_value": search_value};
    let queryString = $.param(data);
    window.location.replace(url + queryString);
}

// Picks a random restaurant type and calls the search function with that value
function surprise_me() {
    let food_types = ["Mexican", "Chinese", "Seafood", "Asian", "Italian", "Fast Food", "Diner", "Steakhouse"];
    let choice = food_types[Math.floor(Math.random() * food_types.length)];
    document.getElementById('search_value').value = choice;
    search();
}