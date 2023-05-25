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
    let divId = this.id.split("-");
    row = divId[0];
    col = divId[1];
    if (checkForMine(row, col)) {
        gameOver();
    }
    else if (Number.isInteger(boardArr[row][col])) {
        this.innerHTML = boardArr[row][col];
        this.style.backgroundColor = "#19ad45";
    }
    else {
        //if square is blank
        this.style.backgroundColor = "#19ad45";
        console.log("clicked");
        checkSurroundingSquares(row, col, "blank");        
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

function checkSurroundingSquares(row, col, type) {
    console.log("in surrounding squares function");
    let rowLength = boardArr[0].length;
    let colLength = boardArr.length;
    //if current square is top left corner
    if (row == 0 && col == 0) {
        console.log("type = " + type);
        console.log(boardArr[row][col + 1])
        CheckRight(row, col, type);
        CheckBottom(row, col, type);
        CheckBottomRight(row, col, type);
    }
    // if current square is top right corner
    if (row == 0 && col == (rowLength - 1)) {
        CheckLeft(row, col, type);
        CheckBottom(row, col, type);
        CheckBottomLeft(row, col, type);
    }
    //if current square is bottom left corner
    if (row == (colLength - 1) && col == 0) {
        CheckRight(row, col, type);
        CheckTop(row, col, type);
        CheckTopRight(row, col, type);
    }
    //if current square is bottom right corner
    if (row == (colLength - 1) && col == (rowLength - 1)) {
        CheckLeft(row, col, type);
        CheckTop(row, col, type);
        CheckTopLeft(row, col, type);
    }    
    //if current square on top row but not a corner
    if (row == 0 && col != 0 || row == 0 && col != (rowLength - 1)) {
        CheckRight(row, col, type);
        CheckLeft(row, col, type);
        CheckBottomLeft(row, col, type);
        CheckBottom(row, col, type);
        CheckBottomRight(row, col, type);
    }    
    //if current square on bottom row but not a corner
    if (row == (colLength - 1) && col != 0 || row == (colLength - 1) && col != (rowLength - 1)) {
        CheckRight(row, col, type);
        CheckLeft(row, col, type);
        CheckTopLeft(row, col, type);
        CheckTop(row, col, type);
        CheckTopRight(row, col, type);
    }    
    //if current square on left column but not a corner
    if (col == 0 && row != 0 || col == 0 && row != (colLength - 1)) {
        CheckTop(row, col, type);
        CheckBottom(row, col, type);
        CheckTopRight(row, col, type);
        CheckRight(row, col, type);
        CheckBottomRight(row, col, type);
    }    
    //if current square on right column but not a corner
    if (row != 0 && col == (colLength - 1) || row != (rowLength - 1) && col == (rowLength - 1)) {
        CheckTop(row, col, type);
        CheckBottom(row, col, type);
        CheckTopLeft(row, col, type);
        CheckLeft(row, col, type);
        CheckBottomLeft(row, col, type);
    }    
    //all other squares
    if (row != 0 && col != 0 && row != (rowLength - 1) && col != (colLength - 1)) {
        CheckTop(row, col, type);
        CheckBottom(row, col, type);
        CheckLeft(row, col, type);
        CheckRight(row, col, type);
        CheckTopLeft(row, col, type);
        CheckTopRight(row, col, type);
        CheckBottomLeft(row, col, type);
        CheckBottomRight(row, col, type);
    }    
}

function placeMineHints() {
    let count = 0;
    let type = "mine";
    let rowLength = boardArr[0].length;
    let colLength = boardArr.length;
    for (let row = 0; row < boardArr.length; row++) {
    for (let col = 0; col < rowLength; col++) {
        //clear boardArr contents
        boardArr[row][col] = ""
        //if current square is top left corner
        if (row == 0 && col == 0) {
            if (checkForMine(row, col)) {
                continue;
            }
            else {
                if (CheckRight(row, col, type)) { //check right of square for mine
                    count++;
                }
                if (CheckBottom(row, col, type)) { //check bottom of square for mine
                    count++;
                }
                if (CheckBottomRight(row, col, type)) { //check bottom right of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                count = 0;
            }
        }
        // if current square is top right corner
        if (row == 0 && col == (rowLength - 1)) {
            if (checkForMine(row, col)) {
                continue;
            } else {
                if (CheckLeft(row, col, type)) { //check left of square for mine
                    count++;
                }
                if (CheckBottom(row, col, type)) { //check bottom of square for mine
                    count++;
                }
                if (CheckBottomLeft(row, col, type)) { //check bottom left of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                count = 0;
            }
        }
    
        //if current square is bottom left corner
        if (row == (colLength - 1) && col == 0) {
            if (checkForMine(row, col)) {
                continue;
            }
            else {
                if (CheckRight(row, col, type)) { //check right of square for mine
                    count++;
                }
                if (CheckTop(row, col, type)) { //check top of square for mine
                    count++;
                }
                if (CheckTopRight(row, col, type)) { //check top right of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                count = 0;
            }
        }
        //if current square is bottom right corner
        if (row == (colLength - 1) && col == (rowLength - 1)) {
            if (checkForMine(row, col)) {
                continue;
            } else {
                if (CheckLeft(row, col, type)) { //check left of square for mine
                    count++;
                }
                if (CheckTop(row, col, type)) { //check top of square for mine
                    count++;
                }
                if (CheckTopLeft(row, col, type)) { //check top left of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                count = 0;
            }
        }
        //if current square on top row but not a corner
        if (row == 0 && col != 0 || row == 0 && col != (rowLength - 1)) {
            if (checkForMine(row, col)) {
                continue;
            }
            else {
                if (CheckRight(row, col, type)) { //check right of square for mine
                    count++;
                }
                if (CheckLeft(row, col, type)) { //check left of square for mine
                    count++;
                }
                if (CheckBottomLeft(row, col, type)) { //check bottom left of square for mine
                    count++;
                }
                if (CheckBottom(row, col, type)) { //check bottom of square for mine
                    count++;
                }
                if (CheckBottomRight(row, col, type)) { //check bottom right of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                count = 0;
            }
        }
        //if current square on bottom row but not a corner
        if (row == (colLength - 1) && col != 0 || row == (colLength - 1) && col != (rowLength - 1)) {
            if (checkForMine(row, col)) {
                continue;
            }
            else {
                if (CheckRight(row, col, type)) { //check right of square for mine
                    count++;
                }
                if (CheckLeft(row, col, type)) { //check left of square for mine
                    count++;
                }
                if (CheckTopLeft(row, col, type)) { //check top left of square for mine
                    count++;
                }
                if (CheckTop(row, col, type)) { //check top of square for mine
                    count++;
                }
                if (CheckTopRight(row, col, type)) { //check top right of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                count = 0;
            }
        }
        //if current square on left column but not a corner
        if (col == 0 && row != 0 || col == 0 && row != (colLength - 1)) {
            if (checkForMine(row, col)) {
                continue;
            }
            else {
                if (CheckTop(row, col, type)) { //check top of square for mine
                    count++;
                }
                if (CheckBottom(row, col, type)) { //check bottom of square for mine
                    count++;
                }
                if (CheckTopRight(row, col, type)) { //check top right of square for mine
                    count++;
                }
                if (CheckRight(row, col, type)) { //check right of square for mine
                    count++;
                }
                if (CheckBottomRight(row, col, type)) { //check bottom right of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                count = 0;
            }
        }
        //if current square on right column but not a corner
        if (row != 0 && col == (colLength - 1) || row != (rowLength - 1) && col == (rowLength - 1)) {
            if (checkForMine(row, col)) {
                continue;
            }
            else {
                if (CheckTop(row, col, type)) { //check top of square for mine
                    count++;
                }
                if (CheckBottom(row, col, type)) { //check bottom of square for mine
                    count++;
                }
                if (CheckTopLeft(row, col, type)) { //check top left of square for mine
                    count++;
                }
                if (CheckLeft(row, col, type)) { //check left of square for mine
                    count++;
                }
                if (CheckBottomLeft(row, col, type)) { //check bottom left of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                count = 0;
            }
        }
        //all other squares
        if (row != 0 && col != 0 && row != (rowLength - 1) && col != (colLength - 1)) {
            if (checkForMine(row, col)) {
                continue;
            }
            else {
                if (CheckTop(row, col, type)) { //check top of square for mine
                    count++;
                }
                if (CheckBottom(row, col, type)) { //check bottom of square for mine
                    count++;
                }
                if (CheckLeft(row, col, type)) { //check left of square for mine
                    count++;
                }
                if (CheckRight(row, col, type)) { //check right of square for mine
                    count++;
                }
                if (CheckTopLeft(row, col, type)) { //check top left of square for mine
                    count++;
                }
                if (CheckTopRight(row, col, type)) { //check top right of square for mine
                    count++;
                }
                if (CheckBottomLeft(row, col, type)) { //check bottom left of square for mine
                    count++;
                }
                if (CheckBottomRight(row, col, type)) { //check bottom right of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
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

// function checkForBlank(row, col) {
//     if (boardArr[row][col] === "") {

//     }
// }
    
function CheckTopLeft(row, col, type) {
    if (type === "mine"){
        return checkForMine((row - 1), (col - 1));
    }
}
    
function CheckTop(row, col, type) {
    if (type === "mine"){
        return checkForMine((row - 1), col);
    }
}
    
function CheckTopRight(row, col, type) {
    if (type === "mine"){
        return checkForMine((row - 1), (col + 1));
    }
}
    
function CheckLeft(row, col, type) {
    if (type === "mine"){
        return checkForMine(row, (col - 1));
    }
}
    
function CheckRight(row, col, type) {    
    if (type === "mine"){
        return checkForMine(row, (col + 1));
    }
    else if (type === "blank" && boardArr[row][col + 1] === "") {
        console.log("in check right clicked, type = " + type);
        let id = row.toString() + "-" + col[+1].toString();
        document.getElementById(id).style.backgroundColor = "#19ad45";
    }
}
    
function CheckBottomLeft(row, col, type) {
    if (type === "mine"){
        return checkForMine((row + 1), (col - 1));
    }
}
    
function CheckBottom(row, col, type) {
    if (type === "mine"){
        return checkForMine((row + 1), col);
    }
}
    
function CheckBottomRight(row, col, type) {
    if (type === "mine"){
        return checkForMine((row + 1), (col + 1));
    }
}