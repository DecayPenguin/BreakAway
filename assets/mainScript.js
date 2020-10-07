var entertainMe = document.getElementById(".card-actionB");
var somethingActive = document.getElementById(".card-actionA");
var supriseMe = document.getElementById(".card-actionC");
var mapMe = document.getq(".zip-code");

function setVisibility(entertainMe) {


    document.addEventListener("click", entertainMe);
    document.addEventListener("click", mapMe);

    function myFunction() {
        var x = document.getElementById(".card-actionB");
        if (x.style.display === ".zip-code") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }


    //   hidden element - zip - show when button is clicked
    function myFunction() {
        var x = document.getElementById("myDIV");
        if (window.getComputedStyle(x).display === "none") {
          // Do something..
        }
      }
// }
// function setVisibility(objectID, state) { 
//     var object = document.getElementById(objectID); object.style.visibility = state; 
// } function toggleVisibility(objectID) { 
//     var object = document.getElementById(objectID); 
//     state = object.style.visibility; 






    // onclick="setVisibility('.card-actionB', 'hidden'); return false;" 
    // href="#">mapMe</a> | <a      





    // if (state == 'visible') object.style.visibility = 'hidden'; 
    // else object.style.visibility = 'visible');