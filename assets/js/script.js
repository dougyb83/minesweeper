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

if (window.location.href.indexOf("8x8game") > 1) {
    // let board = getElementsByClassName("game-board")
    let gameArr = makeGameArr();
    makeTile(gameArr);
};

function makeGameArr() {
    let boardArray = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let cellArr = [];
            cellArr.push(i);
            cellArr.push(j);
            boardArray.push(cellArr);
        }
    }
    return boardArray;
}

function makeTile(arr) {
    let gameBoard = document.getElementsByClassName('game-board');
    gameBoard.innerhtml = <div></div>
}