// $(document).ready(function () {
// }); 


// function openGame(tile) {
//     window.location.href = "8x8game.html";
//     tileCount = tile;
// }

// let tileCount = 0;

// $("#8x8").click(function () {    
//     openGame(8);    
// });
$(document).ready(function () {
    if (window.location.href.indexOf("8x8game") > 1) {
        // let board = getElementsByClassName("game-board")
        createGrid();
        // makeTile(gameArr);
    };
}); 
let boardArr = [];

function createGrid() {
    for (let i = 0; i < 8; i++) {
        let row = [];
        for (let j = 0; j < 8; j++) {
            let boardSquare = document.createElement("div");
            boardSquare.id = i.toString() + "-" + j.toString();
            document.getElementById("game-board").append(boardSquare);            
            row.push(boardSquare);
        }
        boardArr.push(row);
    }  
    console.log(boardArr);
}

// function makeTile(arr) {
//     let gameBoard = document.getElementsByClassName('game-board');
//     gameBoard.innerhtml = <div></div>
// }