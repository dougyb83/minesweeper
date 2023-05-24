// $(document).ready(function () {
// }); 

let boardArr = [];
let mines = 0;
let mineLocation = [];
let tileCount = 0;
let flatArr = [];

$("#8x8").click(function () {
    let tileCount = 8;
    window.location.href = "game.html?tileCount=" + tileCount;
});

$("#9x9").click(function () {
    let tileCount = 9;
    window.location.href = "game.html?tileCount=" + tileCount;
});

$("#16x16").click(function () {
    let tileCount = 16;
    window.location.href = "game.html?tileCount=" + tileCount;
});


$(document).ready(function () {
    let query = location.search;
    tileCount = query.split("=")[1];
    if (tileCount == 8) {
        mines = 9;
    }
    else if (tileCount == 9) {
        mines = 10;
        document.getElementsByClassName;
    }
    else {
        mines = 40;
    }
    createGrid();
    setMines(boardArr);
    placeMineHints();
});


function createGrid() {
    for (let i = 0; i < tileCount; i++) {
        let row = [];
        for (let j = 0; j < tileCount; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            let divId = i.toString() + "-" + j.toString();
            cell.id = divId;
            document.getElementById("game-board").append(cell);
            $(".cell").css("width", 100 / tileCount + "%");
            $(".cell").css("height", 100 / tileCount + "%");
            row.push(cell.id);
            let tile = document.getElementById(divId);
            tile.addEventListener('click', tileClick);
        }
        boardArr.push(row);
    }
}

function tileClick() {    
    this.style.backgroundColor = "#19ad45";
    let divId = this.id.split("-");
    row = divId[0];
    col = divId[1];
    if (checkForMine(row, col)) {
        gameOver();
    }
}

function gameOver() {    
    for (let j = 0; j < mineLocation.length; j++) {
        let reveal = document.getElementById(mineLocation[j]);
        reveal.style.backgroundColor = "#e80202";
        reveal.innerHTML = "💣";
    }
    for (let i = 0; i < flatArr.length; i++) {
        document.getElementById(flatArr[i]).removeEventListener('click', tileClick);
    }
}

function setMines(arr) {
    flatArr = arr.flat();
    for (let i = 0; i < mines; i++) {
        const randomIndex = Math.floor(Math.random() * flatArr.length);
        let randomPosition = flatArr[randomIndex];
        mineLocation.push(randomPosition);
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
                    continue;
                }
                else {
                    if (CheckRight(row, col)) { //check right of square for mine
                        count++;
                    }
                    if (CheckBottom(row, col)) { //check bottom of square for mine
                        count++;
                    }
                    if (CheckBottomRight(row, col)) { //check bottom right of square for mine
                        count++;
                    }
                }
                //  insert count into current square div
                if (count > 0) {
                    document.getElementById(row.toString() + "-" + col.toString()).innerHTML = count;
                    count = 0;
                }
            }
            // if current square is top right corner
            if (row == 0 && col == (rowLength - 1)) {
                if (checkForMine(row, col)) {
                    continue;
                } else {
                    if (CheckLeft(row, col)) { //check left of square for mine
                        count++;
                    }
                    if (CheckBottom(row, col)) { //check bottom of square for mine
                        count++;
                    }
                    if (CheckBottomLeft(row, col)) { //check bottom left of square for mine
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
                    if (CheckRight(row, col)) { //check right of square for mine
                        count++;
                    }
                    if (CheckTop(row, col)) { //check top of square for mine
                        count++;
                    }
                    if (CheckTopRight(row, col)) { //check top right of square for mine
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
                    if (CheckLeft(row, col)) { //check left of square for mine
                        count++;
                    }
                    if (CheckTop(row, col)) { //check top of square for mine
                        count++;
                    }
                    if (CheckTopLeft(row, col)) { //check top left of square for mine
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
                    if (CheckRight(row, col)) { //check right of square for mine
                        count++;
                    }
                    if (CheckLeft(row, col)) { //check left of square for mine
                        count++;
                    }
                    if (CheckBottomLeft(row, col)) { //check bottom left of square for mine
                        count++;
                    }
                    if (CheckBottom(row, col)) { //check bottom of square for mine
                        count++;
                    }
                    if (CheckBottomRight(row, col)) { //check bottom right of square for mine
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
                    if (CheckRight(row, col)) { //check right of square for mine
                        count++;
                    }
                    if (CheckLeft(row, col)) { //check left of square for mine
                        count++;
                    }
                    if (CheckTopLeft(row, col)) { //check top left of square for mine
                        count++;
                    }
                    if (CheckTop(row, col)) { //check top of square for mine
                        count++;
                    }
                    if (CheckTopRight(row, col)) { //check top right of square for mine
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
                    if (CheckTop(row, col)) { //check top of square for mine
                        count++;
                    }
                    if (CheckBottom(row, col)) { //check bottom of square for mine
                        count++;
                    }
                    if (CheckTopRight(row, col)) { //check top right of square for mine
                        count++;
                    }
                    if (CheckRight(row, col)) { //check right of square for mine
                        count++;
                    }
                    if (CheckBottomRight(row, col)) { //check bottom right of square for mine
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
                    if (CheckTop(row, col)) { //check top of square for mine
                        count++;
                    }
                    if (CheckBottom(row, col)) { //check bottom of square for mine
                        count++;
                    }
                    if (CheckTopLeft(row, col)) { //check top left of square for mine
                        count++;
                    }
                    if (CheckLeft(row, col)) { //check left of square for mine
                        count++;
                    }
                    if (CheckBottomLeft(row, col)) { //check bottom left of square for mine
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
                    if (CheckTop(row, col)) { //check top of square for mine
                        count++;
                    }
                    if (CheckBottom(row, col)) { //check bottom of square for mine
                        count++;
                    }
                    if (CheckLeft(row, col)) { //check left of square for mine
                        count++;
                    }
                    if (CheckRight(row, col)) { //check right of square for mine
                        count++;
                    }
                    if (CheckTopLeft(row, col)) { //check top left of square for mine
                        count++;
                    }
                    if (CheckTopRight(row, col)) { //check top right of square for mine
                        count++;
                    }
                    if (CheckBottomLeft(row, col)) { //check bottom left of square for mine
                        count++;
                    }
                    if (CheckBottomRight(row, col)) { //check bottom right of square for mine
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
    if (mineLocation.includes(id)) {
        return true;
    }
}

function CheckTopLeft(row, col) {
    if (checkForMine((row - 1), (col - 1))) {
        return true;
    }
}

function CheckTop(row, col) {
    if (checkForMine((row - 1), col)) {
        return true;
    }
}

function CheckTopRight(row, col) {
    if (checkForMine((row - 1), (col + 1))) {
        return true;
    }
}

function CheckLeft(row, col) {
    if (checkForMine(row, (col - 1))) {
        return true;
    }
}

function CheckRight(row, col) {
    if (checkForMine(row, (col + 1))) {
        return true;
    }
}

function CheckBottomLeft(row, col) {
    if (checkForMine((row + 1), (col - 1))) {
        return true;
    }
}

function CheckBottom(row, col) {
    if (checkForMine((row + 1), col)) {
        return true;
    }
}

function CheckBottomRight(row, col) {
    if (checkForMine((row + 1), (col + 1))) {
        return true;
    }
}


// function makeTile(arr) {
//     let gameBoard = document.getElementsByClassName('game-board');
//     gameBoard.innerhtml = <div></div>
// }
