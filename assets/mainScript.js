
$( document ).ready(function(){
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

// then make AJAX call
$.ajax({
    type:"GET",
    url: queryURL,
    async:true,
    dataType: "json",
    success: function(results) {
                
            console.log(results);
                // Parse the response.
                // Do other things.
                
             },
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
  });

});