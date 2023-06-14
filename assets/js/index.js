/* jshint esversion: 11, jquery: true */

let ls;
// sets expert grid size to be smaller if played on screens 425px or below
if ($(window).width() <= 425) {
    $("#expert").html("Expert<br>12 x 12");
    $("#expert").attr("data-size", "12");
    $("#expert").attr("aria-label", "play 12x12 grid");
 }

// wait for play-button to be clicked, save variable to local storage and open game.html 
$(".play-button").click(function () {    
    let tileCount = parseInt($(this).data("size")); // set tileCount to be equal to data-size
    if ((localStorage.getItem("tileCount"))) { // check if local storage exists
        ls = JSON.parse(localStorage.getItem("tileCount"));  // if local storage exists, get item from localStorage
        ls.count = tileCount; // set tileCount within the 'ls' dict
        localStorage.setItem("tileCount", JSON.stringify(ls)); // set the 'ls' dict into local storage for use on game page
    } else {
        ls = {"count": tileCount}; // if local storage doesn't exist, create dict to store the tileCount
        localStorage.setItem("tileCount", JSON.stringify(ls)); // set the new 'ls' dict into local storage for use on game page
    }
    // open game.html 
    window.location.href = "game.html";
});