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
let boardArr = [];
let mines = 0;
let mineLocation = [];

$(document).ready(function () {
    if (window.location.href.indexOf("8x8game") > 1) {
        // let board = getElementsByClassName("game-board")
        mines = 10;
        createGrid();
        setMines(boardArr)
        // makeTile(gameArr);
        console.log(boardArr);
        console.log(mineLocation);
    };
}); 


function createGrid() {
    for (let i = 0; i < 8; i++) {
        let row = [];
        for (let j = 0; j < 8; j++) {
            let boardSquare = document.createElement("div");
            boardSquare.id = i.toString() + "-" + j.toString();
            document.getElementById("game-board").append(boardSquare);            
            row.push(boardSquare.id);
        }
        boardArr.push(row);
    }  
    return boardArr;
}

function setMines(arr) {
    const flatArr = arr.flat();
    for (let i = 0; i < mines; i++) {
        const randomIndex = Math.floor(Math.random() * flatArr.length);
        let randomPosition = flatArr[randomIndex]
        mineLocation.push(randomPosition);
        let emptySquare = document.getElementById(randomPosition);
        emptySquare.innerHTML = "💣";
    }    
}

// function makeTile(arr) {
//     let gameBoard = document.getElementsByClassName('game-board');
//     gameBoard.innerhtml = <div></div>
// }
