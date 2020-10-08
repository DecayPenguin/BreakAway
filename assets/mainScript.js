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
}

// function for finding a type of result using Google Places API
function searchArea(request) {
    console.log(request);
    
    requestOBJ = {
        query: request,
        fields: ["name", "geometry"]
    }
    map = new google.maps.Map(document.getElementById("map"));
    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(requestOBJ, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
        }
        console.log(results);
    });
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
        searchFor = "Food";
        searchArea(searchFor);
    }
})
//#endregion