//#region Variable Declaration
var googleAPI = "AIzaSyBQzrf9jwhfQltXdobXsZKttRNHZeURN34";
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JpbW1lZGV2IiwiYSI6ImNrZnk3amV0ajI4ZW0yeG84dzBlN2E5NmoifQ.YXham7g6fMpxpJLDX0eZyA';
let map;
let service;
let infowindow;
// L.mapquest.key = mapAPI;
var lat = 0;
var long = 0;
var search = "";
var searchFor = "";
let markers = [];

//#endregion

//#region Function Definitions

// reverse lookup for lat/long of address or zipcode user gives the application
function geoCode(search) {
    queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${googleAPI}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (getGeo) {
        // console.log(getGeo);
        // converts result getGeo into variable lat/long for use elsewhere
        lat = getGeo.results[0].geometry.location.lat;
        long = getGeo.results[0].geometry.location.lng;
        // console.log("Coords: " + lat + ", " + long);
        // calls map to be displayed
        initMap(lat, long);
    })
}

// Displays map based on the getGeo result from the function geoCode
function initMap(lat, long) {
    const myLocation = new google.maps.LatLng(lat, long);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: myLocation,
        zoom: 15,
    });

    // Displays marker on current location
    // var marker = new google.maps.Marker({position: myLocation, map: map});

    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    })
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        console.log(places);
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location
                })
            )
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            }
            else {
                bounds.extend(place.geometry.location);
            }
        })
        map.fitBounds(bounds);
    })
}

// creates a marker on each result created from the searchArea function
function createMarker(place) {
    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name);
        infowindow.open(map);
    })
}


//#endregion


//#region Event Listeners
$("#searchBtn").click(function () {
    // console.log(this);
    if ($(".validate").val() == "")
        console.log("Type something in the area");
    else {
        search = $(".validate").val();
        // console.log(search);
        // getGeo(search);
        // generateMap(search);
        geoCode(search);

        // testing purposes: hardcoded search item
        // searchFor = "Food";
        // searchArea(searchFor);
    }
})
//#endregion