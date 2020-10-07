//#region Variable Declaration
var mapAPI = "unkzycjA9xXArcgGZJ9TVYqGAI33F8OD";
// L.mapquest.key = mapAPI;
var lat = 0;
var long = 0;
var search = "";
var searchFor = "";

//#endregion

//#region Function Definitions

// Converts user entry into lat/long coordinates
function getGeo(search) {
    queryURL = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapAPI}&location=${search}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (result) {
        // console.log(result);
        lat = result.results[0].locations[0].displayLatLng.lat;
        long = result.results[0].locations[0].displayLatLng.lng;
        console.log(lat);
        console.log(long);

        dispMap(lat, long);
    })
};

// Displays map from lat/long coordinates
function dispMap(lat, long) {
    L.mapquest.key = 'KEY';

    var map = L.mapquest.map('map', {
        center: [lat, long],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
    });

    map.addControl(L.mapquest.control());
    map.addControl(L.mapquest.geocodingControl({
        position: 'topleft'
    }));
    searchMap(lat, long, searchFor);
};

function searchMap(search, searchFor) {


    // creates results page
    //https://www.mapquestapi.com/search/v2/radius?
    //origin=Denver,+CO
    //&radius=0.15&maxMatches=3
    //&ambiguities=ignore
    //&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key=KEY

    // searchFor may need to be hardcoded to properly use MapQuest's API
    // link to sic_code: https://developer.mapquest.com/documentation/search-api/v2/points-of-interest/#sic-codes
    searchFor = 581208;
    queryURL = `http://www.mapquestapi.com/search/v2/radius?origin=${search},
    &radius=10&maxMatches=10&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|${searchFor}&outFormat=json&key=${mapAPI}`;

    // queryURL = `http://www.mapquestapi.com/search/v2/radius?key=${mapAPI}&maxMatches=20&origin=${lat},${long}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });


};

//#endregion


//#region Event Listeners
$("#searchBtn").click(function () {
    // console.log(this);
    if ($(".validate").val() == "")
        console.log("Type something in the area");
    else {
        search = $(".validate").val();
        getGeo(search);
    }
})
//#endregion