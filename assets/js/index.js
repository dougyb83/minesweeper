/* jshint esversion: 11, jquery: true */

// wait for play-button to be clicked, save variable to local storage and open game.html 
$(".play-button").click(function () {
    // set tileCount to be equal to data-size
    let tileCount = parseInt($(this).data("size"));
    // setup the JSON stringify for localStorage to persist the game tile count between pages
    let ls = {"count": tileCount};
    // create localStorage called "tileCount" and set it to the `ls` dict above
    localStorage.setItem("tileCount", JSON.stringify(ls));
    // open game.html 
    window.location.href = "game.html";
})


const modal = document.querySelector("[data-modal]")
const closeButton = document.querySelector("[data-close-modal]")

window.onload = modal.showModal();

closeButton.addEventListener("click", () => {
    modal.close()
})