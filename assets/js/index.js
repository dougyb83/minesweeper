/* jshint esversion: 11, jquery: true */

let ls;
// modal variables
const howToPlayModal = document.getElementById("how-to-play-modal");
const closeButton = document.querySelector("[data-close-modal]");

// closes modal when button pressed
closeButton.addEventListener("click", () => {
    howToPlayModal.close();
});

// closes modal by clicking anywhere on screen
howToPlayModal.addEventListener("click", () => {
    howToPlayModal.close();
});

// displays how to play modal
$(".how-to-play-button").click(function () {
    howToPlayModal.showModal();
});

// sets expert grid size to be 12x12 or 16x16 depending on screen size
$(window).on('resize', function(){
    var win = $(this); //this = window    
    if (win.width() <= 425) {
        $("#expert").html("Expert<br>12 x 12").attr("data-size", "12").attr("aria-label", "play 12x12 grid");
    }
    if (win.width() > 425) {
        $("#expert").html("Expert<br>16 x 16").attr("data-size", "16").attr("aria-label", "play 16x16 grid");
    }
});

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