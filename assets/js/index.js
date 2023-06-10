/* jshint esversion: 11, jquery: true */

// sets expert grid size to be smaller if played on screens 425px or below
if ($(window).width() <= 425) {
    $("#expert").html("Expert<br>12 x 12");
    $("#expert").attr("data-size", "12");
    $("#expert").attr("aria-label", "play 12x12 grid");
 }

// wait for play-button to be clicked, save variable to local storage and open game.html 
$(".play-button").click(function () {
    // set tileCount to be equal to data-size
    let tileCount = parseInt($(this).data("size"));
    // setup the JSON stringify for localStorage to persist the game tile count between pages
    let ls = {"count": tileCount};
    // create localStorage called "tileCount" and set it to the `ls` dict above
    localStorage.setItem("gameData", JSON.stringify(ls));
    // open game.html 
    window.location.href = "game.html";
})


// const welcomeModal = document.querySelector("[data-modal]")
// const closeButton = document.querySelector("[data-close-modal]")

// // Only display modal once
// // if (!localStorage.getItem("displayModal")) {
// //     window.onload = welcomeModal.showModal();
// //     let lsModal = {"displayModal": true};
// //     localStorage.setItem("displayModal", JSON.stringify(lsModal));
// // }

// window.onload = welcomeModal.showModal();

// closeButton.addEventListener("click", () => {
//     welcomeModal.close();
// })
