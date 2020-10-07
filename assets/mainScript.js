var entertainMe = document.getElementById(".card-actionB");
var somethingActive = document.getElementById(".card-actionA");
var supriseMe = document.getElementById(".card-actionC");
var mapMe = document.querySelector(".zip-code");



$(document).on("click", function () {
    if ($(this).attr("class") == "Active") {
        console.log("Action Button");
    }
    else if ($(this).attr("class") == "Entertain") {
        console.log("Entertain Button");
    }
    else if ($(this).attr("class") == "Anything") {
        console.log("Anything Button");
    }
    else {
        console.log("No button clicked");
    }
})