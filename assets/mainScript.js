//#region Variable Declaration
var googleAPI = "AIzaSyBQzrf9jwhfQltXdobXsZKttRNHZeURN34";
let map;
let service;
let infowindow;
var lat = 0;
var long = 0;
var search = "";
var searchFor = "";
let markers = [];

var activeBTN = $("#active");
var entertainBTN = $("#entertain");
var foodBTN = $("#wineDine");
var resultStorage = $(".resultStorage");

//#endregion

//#region Function Definitions

// reverse lookup for lat/long of address or zipcode user gives the application
function geoCode(search) {
    search = $("#searchLocation").val();
    // console.log("in geoCode, search for: " + search);
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
    // Appens a map element and search box to the resultStorage to display a map and searchbox inputs
    var element = $(`
        <div class="row">
            <div class="col s12">
                <input id="pac-input" class="controls" type="text" placeholder="Search For..."/>
                <div id = 'map' style = 'width: 600px; height: 500px;'></div>
            </div>
        </div>
        <div class="row">
            <div class="col s12 resultsList"></div>
        </div>
    `);
    resultStorage.append(element);

    const myLocation = new google.maps.LatLng(lat, long);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: myLocation,
        zoom: 15,
    });

    // searchType();
    //#region OldCode
    // Displays marker on current location
    var marker = new google.maps.Marker({ position: myLocation, map: map });

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
        // for loop printing out each result
        $(".resultsList").empty();
        for (var i = 0; i < places.length; i++) {
            // console.log(i);
            if (places[i].business_status == "OPERATIONAL") {
                var element = $(`
                    <div><strong>${places[i].name}</strong></div>
                    <address>${places[i].formatted_address}</address>
                `)
                $(".resultsList").append(element);
            }
        }
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
    });
    // console.log(searchFor);
    $("#pac-input").val(searchFor);
    //#endregion
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

function selectionBtn() {
    // compares which of the 3 buttons were selected, then hides the two NOT selected
    if ($(this).attr("id") == "active") {
        entertainBTN.addClass("hide");
        foodBTN.addClass("hide");
        // hard coding of search selection
        searchFor = "Parks";
        // call to allow the user to input an address or zipcode
        addressEnter();
    }
    else if ($(this).attr("id") == "entertain") {
        activeBTN.addClass("hide");
        foodBTN.addClass("hide");
        // hard coding of search selection
        // searchFor = "Movie Theaters";
        // will use TicketMaster API
        addressEnter();
    }
    else {
        activeBTN.addClass("hide");
        entertainBTN.addClass("hide");
        // hard coding of search selectioFn
        searchFor = "Restaraunts";
        addressEnter();
    }
}

function addressEnter() {
    // Generated element containing a text input for zip/address and a search button
    // search button to be targeted later
    var element = $(`
        <div class="row">
            <div class="col l3 m6 s12">
                <div class="valign-center">
                    <input type="text" id="searchLocation" placeholder="Enter your address or Zipcode">
                    <button class="waves-effect waves-light btn-small" id="searchBTN">
                    <i class="small material-icons">search</i></button>
                </div>
            </div>   
        </div>    
    `);
    $(".bottom").append(element);
    // console.log("elements made");
    $("#searchBTN").one("click", geoCode);
}
    //Button/Form stuff:
    //We grab information entered in textbox or form(address or zipcode ect)
    //Button will trigger AJAX call
    //We get the text from the input form for the URL
    //Makes the URL with data from form and api key
    //AJAX - API stuff
    // items needed: APIKey, URLquery
    // then make AJAX call
    // create code to log the queryURL
    // Create code to log resulting object
    // create code to transfer to HTML
    // create code to put the results of zipcode location in list 
    function getEvents(zipCode) {
        var APIKey = "AGUitf4l225OIMq7fGj5l5i6EKPcppiE"
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&postalCode=" + zipCode + "&apikey=" + APIKey;
        // - this will change to lat&lon or so that what every is put in form is inserted i.e.:
      //LOOK FOR LONG/LAT VERSION INSTEAD OF BELOW CODE
        // var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&postalCode=" + (whatusertypedinform) + "&apikey=" + APIKey
        // then make AJAX call
        $.ajax({
            type: "GET",
            url: queryURL,
            async: true,
            dataType: "json",
            success: function (results) {

                console.log(results);
            }
            }).then(function (results) {
                    var events = results.value;

                    for(var i=0;i<results._embedded.length;i++){

                    // Deleting the event buttons prior to adding new event buttons
                    // (this is necessary otherwise we will have repeat buttons)
                    $("#events-view").empty();

                    // Looping through the array of events
                    for (var i = 0; i < events.length; i++) {

                        
                        var a = $("<div>");
                        // Adding a class
                        a.addClass("eventResults");
                        // Adding a data-attribute with a value of the event at index i
                        a.attr("data-name", events[i]);
                        // Providing the button's text with a value of the event at index i
                        a.text(events[i]);
                        // Adding the button to the HTML
                        $("#events-view").append(a);
                    }
                }

                // Parse the response.
                // Do other things.
                //dynamically created an element inside of the for loop; and append the element to our results container
                $(".eventName").text("Event: " + results._embedded.events[0].name);
                $(".venueName").text("Venue: " + results._embedded.events[0]._embedded.venues[0].name);
                $(".date").text("When: " + results._embedded.events[0].dates.start.dateTime);
                //will need to convert "dateTime" to human english

                // Log the data in the console as well
                console.log("Event: " + results._embedded.events[0].name);
                console.log("Venue: " + results._embedded.events[0]._embedded.venues[0].name);
                console.log("When: " + results._embedded.events[0].dates.start.dateTime);
            

            // Transfer content to HTML

        
    });
    //Don't delete 56 or 58
    
};

//#endregion

//#region Event Listeners
$(document).one("click", "button", selectionBtn);
//#endregion