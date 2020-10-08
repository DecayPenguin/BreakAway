//#region Variable Declaration
var activeBTN = $("#active");
var entertainBTN = $("#entertain");
var foodBTN = $("#wineDine");


//#endregion

//#region Function Definitions
function selectionBtn() {
    console.log(this);
    if ($(this).attr("id") == "active") {
        entertainBTN.addClass("hide");
        foodBTN.addClass("hide");
    }
    else if ($(this).attr("id") == "entertain") {
        activeBTN.addClass("hide");
        foodBTN.addClass("hide");
    }
    else if ($(this).attr("id") == "wineDine") {
        activeBTN.addClass("hide");
        entertainBTN.addClass("hide");
    }
    else {
        activeBTN.removeClass("hide");
        entertainBTN.removeClass("hide");
        foodBTN.removeClass("hide");
    }
}




//#endregion

//#region Event Listeners
$(document).on("click", "button", selectionBtn);

//#endregion