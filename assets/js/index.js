/* jshint esversion: 11, jquery: true */

$(".play-button").click(function () {
    // set tileCount to be equal to data-size
    let tileCount = parseInt($(this).data("size"));
    // setup the JSON stringify for localStorage to persist the game tile count between pages
    let ls = {"count": tileCount};
    // create localStorage called "tileCount" and set it to the `ls` dict above
    localStorage.setItem("tileCount", JSON.stringify(ls));
    window.location.href = "game.html";
})