
$(document).ready(function () {
    //Goal
    // When "entertainment" button is pressed, search of ticket master API occurs

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


    var APIKey = "AGUitf4l225OIMq7fGj5l5i6EKPcppiE"

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&postalCode=78741&apikey=" + APIKey
    // - this will change to lat&lon or so that what every is put in form is inserted i.e.:
    // var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&postalCode=" + (whatusertypedinform) + "&apikey=" + APIKey
    // then make AJAX call
    $.ajax({
        type: "GET",
        url: queryURL,
        async: true,
        dataType: "json",
        success: function (results) {

            console.log(results);
            // Parse the response.
            // Do other things.
            $(".eventName").text("Event: " + results._embedded.events[0].name);
            $(".venueName").text("Venue: " + results._embedded.events[0]._embedded.venues[0].name);
            $(".date").text("When: " + results._embedded.events[0].dates.start.dateTime);
            //will need to convert "dateTime" to human english
    
            // Log the data in the console as well
            console.log("Event: " + results._embedded.events[0].name);
            console.log("Venue: " + results._embedded.events[0]._embedded.venues[0].name);
            console.log("When: " + results._embedded.events[0].dates.start.dateTime);
        },
        error: function (xhr, status, err) {
            // This time, we do not end up here!
        }
             // Transfer content to HTML
       
    });

});