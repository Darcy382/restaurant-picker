/*
* map.js holds the functions responsible for displaying and controlling the google maps api that displays restaurant
* locations.
* */

window.map = undefined;
var markers = [];

// Displays the map
function initMap(biz_locations, lat, long) {
    // Map options
    let options = {
        zoom: 14,
        center: {lat: lat, lng: long},
    };

    // Creates a new map
    window.map = new google.maps.Map(document.getElementById('map'), options);

    // Adds markers
    setMarkers(map, biz_locations);
}

// Sets a markers for every restaurant
function setMarkers(map, biz_locations) {
    let locations = biz_locations;
    for (var i = 0; i < locations.length; i++) {
        var restaurant = locations[i];
        var marker = new google.maps.Marker({
            position: {lat: restaurant[1], lng: restaurant[2]},
            map: map,
            label: (i + 1).toString(),
        });
        markers.push(marker)
    }
}

// Centers the map on the "business block" being hovered over
function imageHover(coordinates) {
    let center = new google.maps.LatLng(coordinates['latitude'], coordinates['longitude']);
    let map = document.getElementById("map");
    window.map.panTo(center);
}