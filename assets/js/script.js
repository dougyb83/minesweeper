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
        setMines(boardArr);
        placeMineHints();
        // makeTile(gameArr);

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

function placeMineHints() { 
    let count = 0; 
    let rowLength = boardArr[0].length;
    let colLength = boardArr.length;
    for (let row = 0; row < boardArr.length; row++) {
        for (let col = 0; col < rowLength; col++) {            
            //if current square is top left corner
            if (row == 0 && col == 0) {
                if (checkForMine(row, col)) {
                    continue
                } 
                else {
                    if (checkForMine(row, (col+1))) { //check right of square for mine
                        count++
                    } 
                    if (checkForMine((row + 1), col)) { //check bottom of square for mine
                        count++
                    } 
                    if (checkForMine((row + 1), (col + 1))) { //check bottom right of square for mine
                        count++
                    }                    
                }
                //  insert count into current square div
                if (count > 0) {
                    document.getElementById(row.toString() + "-" + col.toString()).innerHTML = count;
                    count = 0
                }
            }
            // if current square is top right corner
            if (row == 0 && col == (rowLength - 1)) {
                if (checkForMine(row, col)) {
                    continue;
                } else {
                    if (checkForMine(row, (col - 1))) { //check left of square for mine
                        count++;
                    }
                    if (checkForMine((row + 1), col)) { //check bottom of square for mine
                        count++;
                    }
                    if (checkForMine((row + 1), (col - 1))) { //check bottom left of square for mine
                        count++;
                    }
                }
                //  insert count into current square div
                if (count > 0) {
                    document.getElementById(row.toString() + "-" + col.toString()).innerHTML = count;
                    count = 0;
                }
            }

            //if current square is bottom left corner
            if (row == (colLength - 1) && col == 0) {
                if (checkForMine(row, col)) {
                    continue;
                }
                else {
                    if (checkForMine(row, (col + 1))) { //check right of square for mine
                        count++;
                    }
                    if (checkForMine((row - 1), col)) { //check top of square for mine
                        count++;
                    }
                    if (checkForMine((row - 1), (col + 1))) { //check top right of square for mine
                        count++;
                    }
                }
                //  insert count into current square div
                if (count > 0) {
                    document.getElementById(row.toString() + "-" + col.toString()).innerHTML = count;
                    count = 0;
                }
            }
            //if current square is bottom right corner
            if (row == (colLength - 1) && col == (rowLength - 1)) {
                if (checkForMine(row, col)) {
                    continue;
                } else {
                    if (checkForMine(row, (col - 1))) { //check left of square for mine
                        count++;
                    }
                    if (checkForMine((row - 1), col)) { //check top of square for mine
                        count++;
                    }
                    if (checkForMine((row - 1), (col - 1))) { //check top left of square for mine
                        count++;
                    }
                }
                //  insert count into current square div
                if (count > 0) {
                    document.getElementById(row.toString() + "-" + col.toString()).innerHTML = count;
                    count = 0;
                }
            }
            //if current square on top row but not a corner
            if (row == 0 && col != 0 || row == 0 && col != (rowLength - 1)) {
                if (checkForMine(row, col)) {
                    continue;
                }
                else {
                    if (checkForMine(row, (col + 1))) { //check right of square for mine
                        count++;
                    }
                    if (checkForMine(row, (col- 1))) { //check left of square for mine
                        count++;
                    }
                    if (checkForMine((row + 1), (col - 1))) { //check bottom left of square for mine
                        count++;
                    }
                    if (checkForMine((row + 1), col)) { //check bottom of square for mine
                        count++;
                    }
                    if (checkForMine((row + 1), (col + 1))) { //check bottom right of square for mine
                        count++;
                    }
                }
                //  insert count into current square div
                if (count > 0) {
                    document.getElementById(row.toString() + "-" + col.toString()).innerHTML = count;
                    count = 0;
                }
            }
            //if current square on bottom row but not a corner
            if (row == (colLength - 1) && col != 0 || row == (colLength - 1) && col != (rowLength - 1)) {
                if (checkForMine(row, col)) {
                    continue;
                }
                else {
                    if (checkForMine(row, (col + 1))) { //check right of square for mine
                        count++;
                    }
                    if (checkForMine(row, (col - 1))) { //check left of square for mine
                        count++;
                    }
                    if (checkForMine((row - 1), (col - 1))) { //check top left of square for mine
                        count++;
                    }
                    if (checkForMine((row - 1), col)) { //check top of square for mine
                        count++;
                    }
                    if (checkForMine((row - 1), (col + 1))) { //check top right of square for mine
                        count++;
                    }
                }
                //  insert count into current square div
                if (count > 0) {
                    document.getElementById(row.toString() + "-" + col.toString()).innerHTML = count;
                    count = 0;
                }
            }
            //if current square on left column but not a corner
            if (col == 0 && row != 0 || col == 0 && row != (colLength - 1)) {
                if (checkForMine(row, col)) {
                    continue;
                }
                else {
                    if (checkForMine((row - 1), col)) { //check top of square for mine
                        count++;
                    }
                    if (checkForMine((row + 1), col)) { //check bottom of square for mine
                        count++;
                    }
                    if (checkForMine((row - 1), (col + 1))) { //check top right of square for mine
                        count++;
                    }
                    if (checkForMine(row, (col + 1))) { //check right of square for mine
                        count++;
                    }
                    if (checkForMine((row + 1), (col + 1))) { //check bottom right of square for mine
                        count++;
                    }
                }
                //  insert count into current square div
                if (count > 0) {
                    document.getElementById(row.toString() + "-" + col.toString()).innerHTML = count;
                    count = 0;
                }
            }
            //if current square on right column but not a corner
            if (row != 0 && col == (colLength - 1) || row != (rowLength - 1) && col == (rowLength - 1)) {
                if (checkForMine(row, col)) {
                    continue;
                }
                else {
                    if (checkForMine((row - 1), col)) { //check top of square for mine
                        count++;
                    }
                    if (checkForMine((row + 1), col)) { //check bottom of square for mine
                        count++;
                    }
                    if (checkForMine((row - 1), (col - 1))) { //check top left of square for mine
                        count++;
                    }
                    if (checkForMine(row, (col - 1))) { //check left of square for mine
                        count++;
                    }
                    if (checkForMine((row + 1), (col - 1))) { //check bottom left of square for mine
                        count++;
                    }
                }
                //  insert count into current square div
                if (count > 0) {
                    document.getElementById(row.toString() + "-" + col.toString()).innerHTML = count;
                    count = 0;
                }
            }
            //all other squares
            if (row != 0 && col != 0 && row != (rowLength - 1) && col != (colLength - 1)) {
                if (checkForMine(row, col)) {
                    continue;
                }
                else {
                    if (checkForMine((row - 1), col)) { //check top of square for mine
                        count++;
                    }
                    if (checkForMine((row + 1), col)) { //check bottom of square for mine
                        count++;
                    }
                    if (checkForMine(row, (col - 1))) { //check left of square for mine
                        count++;
                    }
                    if (checkForMine(row, (col + 1))) { //check right of square for mine
                        count++;
                    }
                    if (checkForMine((row - 1), (col - 1))) { //check top left of square for mine
                        count++;
                    }
                    if (checkForMine((row - 1), (col + 1))) { //check top right of square for mine
                        count++;
                    }
                    if (checkForMine((row + 1), (col - 1))) { //check bottom left of square for mine
                        count++;
                    }
                    if (checkForMine((row + 1), (col + 1))) { //check bottom right of square for mine
                        count++;
                    }
                }
                //  insert count into current square div
                if (count > 0) {
                    document.getElementById(row.toString() + "-" + col.toString()).innerHTML = count;
                    count = 0;
                }
            }
        }
    }
}



function checkForMine(row, col) {
    let id = row.toString() + "-" + col.toString();
    console.log(id);
    if (mineLocation.includes(id)) {
        console.log("mine");
        return true
    }
}

// function makeTile(arr) {
//     let gameBoard = document.getElementsByClassName('game-board');
//     gameBoard.innerhtml = <div></div>
// }
