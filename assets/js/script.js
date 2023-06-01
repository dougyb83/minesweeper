/* jshint esversion: 11, jquery: true */
let boardArr = [];
let flatArr = [];
let mineLocation = [];
let mines = 0;
let tileCount = 0;
let rowLength = 0;
let colLength = 0;
let seconds = 0;
let timer;

$("#8x8").click(function () {
    tileCount = 8;
    window.location.href = "game.html?tileCount=" + tileCount;
});

$("#9x9").click(function () {
    tileCount = 9;
    window.location.href = "game.html?tileCount=" + tileCount;
});

$("#16x16").click(function () {
    tileCount = 16;
    window.location.href = "game.html?tileCount=" + tileCount;
});



$(document).ready(function () {
    if (window.location.href.includes("game.html")) {
        let query = location.search;
        // add error handling if url doesnt contain tileCount ===========================================================================================================
        tileCount = query.split("=")[1];
        if (tileCount == 8) {
            mines = 8;
        }
        else if (tileCount == 9) {
            mines = 9; 
        }
        else {
            mines = 40;
        }

        $(".reset").click(function () {
            document.getElementById("timer").innerHTML = seconds;
            boardArr = [];
            flatArr = [];
            mineLocation = [];
            $("#game-board").empty();
            createGrid();
            setMines(boardArr);
            placeMineHints();
        });
        
        $(".home").click(function () {
            window.location.href = "index.html";
        });
        
        $(".volume-on").click(function () {
            $(this).removeClass("volume-on fa-solid fa-volume-high").addClass("volume-off fa-solid fa-volume-xmark");
        });
        $(".volume-off").click(function () {
            $(this).removeClass("volume-off fa-solid fa-volume-xmark").addClass("volume-on fa-solid fa-volume-high");
        });
        document.getElementsByClassName("mine-count")[0].innerHTML = mines;
        createGrid();
        setMines(boardArr);
        placeMineHints();
    }
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
            tile.addEventListener('contextmenu', placeFlag);
        }
        boardArr.push(row);
    }
}

function setMines(arr) {
    flatArr = arr.flat();
    for (let i = 0; i < mines; i++) {
        let randomIndex = Math.floor(Math.random() * flatArr.length);
        while (mineLocation.includes(flatArr[randomIndex])) {
            randomIndex = Math.floor(Math.random() * flatArr.length);
        }
        let randomPosition = flatArr[randomIndex];
        mineLocation.push(randomPosition);
    }
}

function placeMineHints() {
    let count = 0;
    let type = "mine";
    rowLength = boardArr[0].length;
    colLength = boardArr.length;
    for (let row = 0; row < rowLength; row++) {
    for (let col = 0; col < colLength; col++) {
        //clear boardArr contents
        boardArr[row][col] = "";
        //if current square is top left corner
        if (row == 0 && col == 0) {
            if (checkForMine(row, col)) {
                continue;
            }
            else {
                if (checkRight(row, col, type)) { //check right of square for mine
                    count++;
                }
                if (checkBottom(row, col, type)) { //check bottom of square for mine
                    count++;
                }
                if (checkBottomRight(row, col, type)) { //check bottom right of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                // let divId = row.toString() + "-" + col.toString();
                // document.getElementById(divId).innerHTML = count;
                count = 0;
            }
        }
        // if current square is top right corner
        else if (row == 0 && col == (rowLength - 1)) {
            if (checkForMine(row, col)) {
                continue;
            } else {
                if (checkLeft(row, col, type)) { //check left of square for mine
                    count++;
                }
                if (checkBottom(row, col, type)) { //check bottom of square for mine
                    count++;
                }
                if (checkBottomLeft(row, col, type)) { //check bottom left of square for mine
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
        else if (row == (colLength - 1) && col == 0) {
            if (checkForMine(row, col)) {
                continue;
            }
            else {
                if (checkRight(row, col, type)) { //check right of square for mine
                    count++;
                }
                if (checkTop(row, col, type)) { //check top of square for mine
                    count++;
                }
                if (checkTopRight(row, col, type)) { //check top right of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                // let divId = row.toString() + "-" + col.toString();
                // document.getElementById(divId).innerHTML = count;
                count = 0;
            }
        }
        //if current square is bottom right corner
        else if (row == (colLength - 1) && col == (rowLength - 1)) {
            if (checkForMine(row, col)) {
                continue;
            } else {
                if (checkLeft(row, col, type)) { //check left of square for mine
                    count++;
                }
                if (checkTop(row, col, type)) { //check top of square for mine
                    count++;
                }
                if (checkTopLeft(row, col, type)) { //check top left of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                // let divId = row.toString() + "-" + col.toString();
                // document.getElementById(divId).innerHTML = count;
                count = 0;
            }
        }
        //if current square on top row but not a corner
        else if (row == 0 && col != 0 || row == 0 && col != (rowLength - 1)) {
            if (checkForMine(row, col)) {
                continue;
            }
            else {
                if (checkRight(row, col, type)) { //check right of square for mine
                    count++;
                }
                if (checkLeft(row, col, type)) { //check left of square for mine
                    count++;
                }
                if (checkBottomLeft(row, col, type)) { //check bottom left of square for mine
                    count++;
                }
                if (checkBottom(row, col, type)) { //check bottom of square for mine
                    count++;
                }
                if (checkBottomRight(row, col, type)) { //check bottom right of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                // let divId = row.toString() + "-" + col.toString();
                // document.getElementById(divId).innerHTML = count;
                count = 0;
            }
        }
        //if current square on bottom row but not a corner
        else if (row == (colLength - 1) && col != 0 || row == (colLength - 1) && col != (rowLength - 1)) {
            if (checkForMine(row, col)) {
                continue;
            }
            else {
                if (checkRight(row, col, type)) { //check right of square for mine
                    count++;
                }
                if (checkLeft(row, col, type)) { //check left of square for mine
                    count++;
                }
                if (checkTopLeft(row, col, type)) { //check top left of square for mine
                    count++;
                }
                if (checkTop(row, col, type)) { //check top of square for mine
                    count++;
                }
                if (checkTopRight(row, col, type)) { //check top right of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                // let divId = row.toString() + "-" + col.toString();
                // document.getElementById(divId).innerHTML = count;
                count = 0;
            }
        }
        //if current square on left column but not a corner
        else if (col == 0 && row != 0 || col == 0 && row != (colLength - 1)) {
            if (checkForMine(row, col)) {
                continue;
            }
            else {
                if (checkTop(row, col, type)) { //check top of square for mine
                    count++;
                }
                if (checkBottom(row, col, type)) { //check bottom of square for mine
                    count++;
                }
                if (checkTopRight(row, col, type)) { //check top right of square for mine
                    count++;
                }
                if (checkRight(row, col, type)) { //check right of square for mine
                    count++;
                }
                if (checkBottomRight(row, col, type)) { //check bottom right of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                // let divId = row.toString() + "-" + col.toString();
                // document.getElementById(divId).innerHTML = count;
                count = 0;
            }
        }
        //if current square on right column but not a corner
        else if (row != 0 && col == (colLength - 1) || row != (rowLength - 1) && col == (rowLength - 1)) {
            if (checkForMine(row, col)) {
                continue;
            }
            else {
                if (checkTop(row, col, type)) { //check top of square for mine
                    count++;
                }
                if (checkBottom(row, col, type)) { //check bottom of square for mine
                    count++;
                }
                if (checkTopLeft(row, col, type)) { //check top left of square for mine
                    count++;
                }
                if (checkLeft(row, col, type)) { //check left of square for mine
                    count++;
                }
                if (checkBottomLeft(row, col, type)) { //check bottom left of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                // let divId = row.toString() + "-" + col.toString();
                // document.getElementById(divId).innerHTML = count;
                count = 0;
            }
        }
        //all other squares
        else {
            if (checkForMine(row, col)) {
                continue;
            }
            else {
                if (checkTop(row, col, type)) { //check top of square for mine
                    count++;
                }
                if (checkBottom(row, col, type)) { //check bottom of square for mine
                    count++;
                }
                if (checkLeft(row, col, type)) { //check left of square for mine
                    count++;
                }
                if (checkRight(row, col, type)) { //check right of square for mine
                    count++;
                }
                if (checkTopLeft(row, col, type)) { //check top left of square for mine
                    count++;
                }
                if (checkTopRight(row, col, type)) { //check top right of square for mine
                    count++;
                }
                if (checkBottomLeft(row, col, type)) { //check bottom left of square for mine
                    count++;
                }
                if (checkBottomRight(row, col, type)) { //check bottom right of square for mine
                    count++;
                }
            }
            //  insert count into current square div
            if (count > 0) {
                boardArr[row][col] = count;
                // let divId = row.toString() + "-" + col.toString();
                // document.getElementById(divId).innerHTML = count;
                count = 0;
            }
        }
    }
    }
}

function tileClick() {    
    let divId = this.id.split("-");
    this.classList.add("clicked");
    let row = Number(divId[0]);
    let col = Number(divId[1]);
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
        checkSurroundingSquares(row, col, "blank");                
    }

    if (seconds === 0) {
        timer = setInterval(upTimer, 1000);
    }

    if (document.querySelectorAll('#game-board .clicked').length === flatArr.length - mines) {
        clearInterval(timer);
        alert('Congratulations, You found all the mines!');
    }
}

function upTimer() {
    ++seconds;
    let counter = document.getElementById("timer");
    counter.innerHTML = seconds;
    $(".reset").click(function() { 
        clearInterval(timer);
        seconds = 0;
        counter.innerHTML = 0;
    });  
}

function placeFlag() {  
    if (this.classList.contains("clicked")) {
        return;
    }  
    if (this.innerHTML === "🚩") {
        this.innerHTML = "";
        this.addEventListener('click', tileClick);
        document.getElementsByClassName("mine-count")[0].innerHTML ++;
    }
    else {
        this.innerHTML = "🚩";
        this.removeEventListener('click', tileClick);
        document.getElementsByClassName("mine-count")[0].innerHTML --;
    }
}

function gameOver() {   
    clearInterval(timer);
    for (let j = 0; j < mineLocation.length; j++) {
        let reveal = document.getElementById(mineLocation[j]);
        reveal.style.backgroundColor = "#e80202";
        reveal.innerHTML = "💣";
    }
    for (let i = 0; i < flatArr.length; i++) {
        document.getElementById(flatArr[i]).removeEventListener('click', tileClick);
    }
}

function checkSurroundingSquares(row, col, type) {

    //if current square is top left corner
    if (row === 0 && col === 0) {
        checkRight(row, col, type);
        checkBottom(row, col, type);
        checkBottomRight(row, col, type);
    }
    // if current square is top right corner
    else if (row === 0 && col === (rowLength - 1)) {
        checkLeft(row, col, type);
        checkBottom(row, col, type);
        checkBottomLeft(row, col, type);
    }
    //if current square is bottom left corner
    else if (row === (colLength - 1) && col === 0) {
        checkRight(row, col, type);
        checkTop(row, col, type);
        checkTopRight(row, col, type);
    }
    //if current square is bottom right corner
    else if (row === (colLength - 1) && col === (rowLength - 1)) {
        checkLeft(row, col, type);
        checkTop(row, col, type);
        checkTopLeft(row, col, type);
    }    
    //if current square on top row but not a corner
    else if ((row === 0 && col !== 0) && (row === 0 && col !== (rowLength - 1))) {
        checkRight(row, col, type);
        checkLeft(row, col, type);
        checkBottomLeft(row, col, type);
        checkBottom(row, col, type);
        checkBottomRight(row, col, type);
    }    
    //if current square on bottom row but not a corner
    else if ((row === (colLength - 1) && col !== 0) && (row === (colLength - 1) && col !== (rowLength - 1))) {
        checkRight(row, col, type);
        checkLeft(row, col, type);
        checkTopLeft(row, col, type);
        checkTop(row, col, type);
        checkTopRight(row, col, type);
    }    
    //if current square on left column but not a corner
    else if ((col === 0 && row !== 0) && (col === 0 && row !== (colLength - 1))) {
        checkTop(row, col, type);
        checkBottom(row, col, type);
        checkTopRight(row, col, type);
        checkRight(row, col, type);
        checkBottomRight(row, col, type);
    }    
    //if current square on right column but not a corner
    else if ((row !== 0 && col === (colLength - 1)) && (row !== (rowLength - 1) && col === (rowLength - 1))) {
        checkTop(row, col, type);
        checkBottom(row, col, type);
        checkTopLeft(row, col, type);
        checkLeft(row, col, type);
        checkBottomLeft(row, col, type);
    }    
    //all other squares
    else {
        checkTop(row, col, type);
        checkBottom(row, col, type);
        checkLeft(row, col, type);
        checkRight(row, col, type);
        checkTopLeft(row, col, type);
        checkTopRight(row, col, type);
        checkBottomLeft(row, col, type);
        checkBottomRight(row, col, type);
    }    
}

function checkForMine(row, col) {
    let id = row.toString() + "-" + col.toString();
    if (mineLocation.includes(id)) {
    return true;
    }
}

function checkTile(row, col, type) {
    let id = row.toString() + "-" + col.toString();
    let tile = document.getElementById(id);
    if (tile.classList.contains("clicked")) {
        return;
    }
    else if (type === "blank" && boardArr[row][col] === "") {
        tile.classList.add("clicked");
        tile.style.backgroundColor = "#19ad45";
        tile.removeEventListener('click', tileClick);        
        checkSurroundingSquares(row, col, "blank");
    }
    else if (Number.isInteger(boardArr[row][col])) {
        tile.classList.add("clicked");
        tile.style.backgroundColor = "#19ad45";        
        tile.innerHTML = boardArr[row][col];
        tile.removeEventListener('click', tileClick);
    }
    else {
        return;
    }
}

function checkTopLeft(row, col, type) {
    row = row - 1;
    col = col - 1;
    if (type === "mine"){
        return checkForMine(row, col);
    }
    else {
        checkTile(row, col, type);
    }
}
    
function checkTop(row, col, type) {
    row = row - 1;
    if (type === "mine"){
        return checkForMine(row, col);
    }
    else {
        checkTile(row, col, type);
    }
}
    
function checkTopRight(row, col, type) {
    row = row - 1;
    col = col + 1;
    if (type === "mine"){
        return checkForMine(row, col);
    }
    else {
        checkTile(row, col, type);
    }
}
    
function checkLeft(row, col, type) {
    col = col - 1;
    if (type === "mine"){
        return checkForMine(row, col);
    }
    else {
        checkTile(row, col, type);
    }
}
    
function checkRight(row, col, type) {   
    col = col + 1; 
    if (type === "mine"){
        return checkForMine(row, col);
    }
    else {
        checkTile(row, col, type);
    }
}
    
function checkBottomLeft(row, col, type) {
    row = row + 1;
    col = col - 1;
    if (type === "mine"){
        return checkForMine(row, col);
    }
    else {
        checkTile(row, col, type);
    }
}
    
function checkBottom(row, col, type) {
    row = row + 1;
    if (type === "mine"){
        return checkForMine(row, col);
    }
    else {
        checkTile(row, col, type);
    }
}
    
function checkBottomRight(row, col, type) {
    row = row + 1;
    col = col + 1;
    if (type === "mine"){
        return checkForMine(row, col);
    }
    else {
        checkTile(row, col, type);
    }
}