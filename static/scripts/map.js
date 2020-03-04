window.map = undefined;
var markers = [];

function initMap(biz_locations, lat, long) {
    // Map options
    var options = {
        zoom: 14,
        center: {lat: lat, lng: long},
    };

    // New map
    window.map = new google.maps.Map(document.getElementById('map'), options);

    // Add marker
    setMarkers(map, biz_locations);
}

function setMarkers(map, biz_locations) {
    var locations = biz_locations;
    for (var i = 0; i < locations.length; i++) {
        var restaurant = locations[i];
        var marker = new google.maps.Marker({
            position: {lat: restaurant[1], lng: restaurant[2]},
            map: map,
            title: restaurant[0],
            label: (i + 1).toString(),
        });
        markers.push(marker)
    }
}

function imageHover(coordinates, markerNum) {
    var center = new google.maps.LatLng(coordinates['latitude'], coordinates['longitude']);
    var map = document.getElementById("map");
    window.map.panTo(center);
}