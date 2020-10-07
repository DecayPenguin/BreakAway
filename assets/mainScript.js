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

function geoCode(search) {
    queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${googleAPI}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (getGeo) {
        console.log(getGeo);
        lat = getGeo.results[0].geometry.location.lat;
        long = getGeo.results[0].geometry.location.lng;
        console.log("Coords: " + lat + ", " + long);
        initMap(lat, long);
    })
}

function initMap(lat, long) {
    const myLocation = new google.maps.LatLng(lat, long);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: myLocation,
        zoom: 15,
    });

    var marker = new google.maps.Marker({position: myLocation, map: map});
    // const request = {
    //     query: "Museum of Contemporary Art Australia",
    //     fields: ["name", "geometry"],
    // };
    // service = new google.maps.places.PlacesService(map);
    // service.findPlaceFromQuery(request, (results, status) => {
    //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //         for (let i = 0; i < results.length; i++) {
    //             createMarker(results[i]);
    //         }
    //         map.setCenter(results[0].geometry.location);
    //     }
    // });
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
    }
})
//#endregion