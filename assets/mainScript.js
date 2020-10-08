//#region Variable Declaration
var activeBTN = $("#active");
var entertainBTN = $("#entertain");
var foodBTN = $("#wineDine");


//#endregion

//#region Function Definitions
function selectionBtn() {
    // console.log(this);
    if ($(this).attr("id") == "active") {
        entertainBTN.addClass("hide");
        foodBTN.addClass("hide");
        addressEnter();
    }
    else if ($(this).attr("id") == "entertain") {
        activeBTN.addClass("hide");
        foodBTN.addClass("hide");
        addressEnter();
    }
    else {
        activeBTN.addClass("hide");
        entertainBTN.addClass("hide");
        addressEnter();
    }
}

function addressEnter() {
    // var el = $("<div class='row'><div class='valign-center'");
    // var input = $("<input type='text'>")
    // $("body").append(el);
    // // console.log("div added");
    // $(el).append(input);
    // // console.log("input added");
    var element = $(`
        <div class="row">
            <div class="col s6">
                <div class="valign-center">
                    <input type="text" placeholder="Enter your address or Zipcode">
                </div>
            </div>   
        </div>    
    `);
    $(".container").append(element);

}




//#endregion

//#region Event Listeners
$(document).one("click", "button", selectionBtn);

//#endregion