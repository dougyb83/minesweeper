/* jshint esversion: 11, jquery: true */

// global variables
let boardArr = [];
let flatArr = [];
let mineLocation = [];
let mines = 0;
let tileCount = 0;
let rowLength = 0;
let colLength = 0;
let seconds = 0;
let bestTime = 0;
let timer;
let gameOverCalled = false;

// modal variables
const howToPlayModal = document.getElementById("how-to-play-modal");
const endGameModal = document.getElementById("end-game-modal");
const closeButton = document.querySelector("[data-close-modal]");


// when page is loaded
$(document).ready(function () {
    // get object from local storage
    ls = JSON.parse(localStorage.getItem("gameData"));  // get item from localStorage
    // if local storage exists extract data and set variables
    if (ls.count) {
        if (ls.count === 8) {
            mines = ls.count; // set mines to 8
            tileCount = ls.count; // set tileCount, used to set grid size
        } else if (ls.count === 9) {
            mines = 10 // set mines to 10
            tileCount = ls.count;  
        } else if (ls.count === 12) {
            mines = 30 // set mines to 30
            tileCount = ls.count;  
        } else {
            mines = 40;  // otherwise set mines to 40 
            tileCount = 16;
        }
    }
    // closes modal when button pressed
    closeButton.addEventListener("click", () => {
        howToPlayModal.close();
    })
    // return to home page
    $(".home").click(function () {
        window.location.href = "index.html";
    });
    // resets the game
    $(".reset").click(function () {
        gameOverCalled = false;
        clearInterval(timer); // stops the timer
        seconds = 0;
        document.getElementById("timer").innerHTML = seconds; // reset timer display to 0
        document.getElementsByClassName("mine-count")[0].innerHTML = mines; //reset mine display
        document.getElementsByClassName("smiley-button")[0].innerHTML = "😀";
        boardArr = [];
        flatArr = [];
        mineLocation = [];
        $("#game-board").empty();
        createGrid();
        setMines(boardArr);
        placeMineHints();
    });
    // displays hot to play modal
    $(".how-to-play").click(function () {
        howToPlayModal.showModal();
    })
    // toggles volume icon
    $(".volume").click(function () {
        if (this.classList.contains("fa-volume-xmark")) {
            $(this).removeClass("fa-volume-xmark").addClass("fa-volume-high");
        }
        else {
            $(this).removeClass("fa-volume-high").addClass("fa-volume-xmark");
        }
        
    });
    // sets the visible mine count equal to mines
    document.getElementsByClassName("mine-count")[0].innerHTML = mines;
    // populates the game board
    createGrid();
    setMines();
    placeMineHints();
});

// populates the gameboard with tiles
function createGrid() {
    //creates a 2d array
    for (let i = 0; i < tileCount; i++) {
        // create a row array
        let row = [];
        for (let j = 0; j < tileCount; j++) {
            //for each tile, create a div
            let cell = document.createElement("div");
            // add .cell class to each tile div
            cell.classList.add("cell");
            // give each tile div a unique id
            let divId = i.toString() + "-" + j.toString();
            cell.id = divId;
            // append the div to the game board
            document.getElementById("game-board").append(cell);
            //add event listenter to each tile div            
            let tile = document.getElementById(divId);
            tile.addEventListener('click', tileClick); // if left clicked call the tileClick function
            tile.addEventListener('contextmenu', placeFlag); // if right clicked call the placeFlag function
            // add the id to the row array
            row.push(cell.id);
        }
        // add each row to the boardArr array
        boardArr.push(row);
    }
    // divide each tiles height and width equally dependant on number of tiles in the grid
    $(".cell").css("width", 96 / tileCount + "%");
    $(".cell").css("height", 96 / tileCount + "%");
}

// randomly chooses mine positions
function setMines() {
    // flattens the 2d array into a 1d array
    flatArr = boardArr.flat();
    for (let i = 0; i < mines; i++) {
        // create a random number used to index into the flatArr array
        let randomIndex = Math.floor(Math.random() * flatArr.length);
        // checks if the index has already been used and produces another random index if it has
        while (mineLocation.includes(flatArr[randomIndex])) {
            randomIndex = Math.floor(Math.random() * flatArr.length);
        }
        // index into the flatArr and grab the data(id)
        let randomPosition = flatArr[randomIndex];
        // add the id to the mineLocation array
        mineLocation.push(randomPosition);
    }
}

// creates a mine hint for each tile that has one or more mins surrounfing it and stores the hint in an array
function placeMineHints() {
    let count = 0;
    let type = "mine";
    rowLength = boardArr[0].length;
    colLength = boardArr.length;
    // iterates over each row in the 2d array
    for (let row = 0; row < rowLength; row++) {
        // iterates over each column within the row
        for (let col = 0; col < colLength; col++) {
            // set each item in boardArr to an empty string
            boardArr[row][col] = "";
            // if current tile is top left corner
            if (row == 0 && col == 0) {
                if (checkForMine(row, col)) {
                    continue;
                }
                else {
                    if (checkRight(row, col, type)) { // check right of tile for mine
                        count++; // if mine found increase count by 1 // if mine found increase count by 1
                    }
                    if (checkBottom(row, col, type)) { // check bottom of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkBottomRight(row, col, type)) { // check bottom right of tile for mine
                        count++; // if mine found increase count by 1
                    }
                }
                // insert number hint into the array
                if (count > 0) {
                    boardArr[row][col] = count;
                    count = 0; // reset count to 0
                }
            }
            // if current tile is top right corner
            else if (row == 0 && col == (rowLength - 1)) {
                if (checkForMine(row, col)) {
                    continue;
                } else {
                    if (checkLeft(row, col, type)) { //check left of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkBottom(row, col, type)) { //check bottom of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkBottomLeft(row, col, type)) { //check bottom left of tile for mine
                        count++; // if mine found increase count by 1
                    }
                }
                // if count greater than 0, insert number hint into the array
                if (count > 0) {
                    boardArr[row][col] = count;
                    count = 0; // reset count to 0
                }
            }
        
            //if current tile is bottom left corner
            else if (row == (colLength - 1) && col == 0) {
                if (checkForMine(row, col)) {
                    continue;
                }
                else {
                    if (checkRight(row, col, type)) { //check right of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkTop(row, col, type)) { //check top of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkTopRight(row, col, type)) { //check top right of tile for mine
                        count++; // if mine found increase count by 1
                    }
                }
                // if count greater than 0, insert number hint into the array
                if (count > 0) {
                    boardArr[row][col] = count;
                    count = 0; // reset count to 0
                }
            }
            //if current tile is bottom right corner
            else if (row == (colLength - 1) && col == (rowLength - 1)) {
                if (checkForMine(row, col)) {
                    continue;
                } else {
                    if (checkLeft(row, col, type)) { //check left of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkTop(row, col, type)) { //check top of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkTopLeft(row, col, type)) { //check top left of tile for mine
                        count++; // if mine found increase count by 1
                    }
                }
                // if count greater than 0, insert number hint into the array
                if (count > 0) {
                    boardArr[row][col] = count;
                    count = 0; // reset count to 0
                }
            }
            //if current tile on top row but not a corner
            else if (row == 0 && col != 0 || row == 0 && col != (rowLength - 1)) {
                if (checkForMine(row, col)) {
                    continue;
                }
                else {
                    if (checkRight(row, col, type)) { //check right of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkLeft(row, col, type)) { //check left of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkBottomLeft(row, col, type)) { //check bottom left of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkBottom(row, col, type)) { //check bottom of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkBottomRight(row, col, type)) { //check bottom right of tile for mine
                        count++; // if mine found increase count by 1
                    }
                }
                // if count greater than 0, insert number hint into the array
                if (count > 0) {
                    boardArr[row][col] = count;
                    count = 0; // reset count to 0
                }
            }
            //if current tile on bottom row but not a corner
            else if (row == (colLength - 1) && col != 0 || row == (colLength - 1) && col != (rowLength - 1)) {
                if (checkForMine(row, col)) {
                    continue;
                }
                else {
                    if (checkRight(row, col, type)) { //check right of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkLeft(row, col, type)) { //check left of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkTopLeft(row, col, type)) { //check top left of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkTop(row, col, type)) { //check top of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkTopRight(row, col, type)) { //check top right of tile for mine
                        count++; // if mine found increase count by 1
                    }
                }
                // if count greater than 0, insert number hint into the array
                if (count > 0) {
                    boardArr[row][col] = count;
                    count = 0; // reset count to 0
                }
            }
            //if current tile on left column but not a corner
            else if (col == 0 && row != 0 || col == 0 && row != (colLength - 1)) {
                if (checkForMine(row, col)) {
                    continue;
                }
                else {
                    if (checkTop(row, col, type)) { //check top of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkBottom(row, col, type)) { //check bottom of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkTopRight(row, col, type)) { //check top right of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkRight(row, col, type)) { //check right of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkBottomRight(row, col, type)) { //check bottom right of tile for mine
                        count++; // if mine found increase count by 1
                    }
                }
                // if count greater than 0, insert number hint into the array
                if (count > 0) {
                    boardArr[row][col] = count;
                    count = 0; // reset count to 0
                }
            }
            //if current tile on right column but not a corner
            else if (row != 0 && col == (colLength - 1) || row != (rowLength - 1) && col == (rowLength - 1)) {
                if (checkForMine(row, col)) {
                    continue;
                }
                else {
                    if (checkTop(row, col, type)) { //check top of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkBottom(row, col, type)) { //check bottom of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkTopLeft(row, col, type)) { //check top left of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkLeft(row, col, type)) { //check left of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkBottomLeft(row, col, type)) { //check bottom left of tile for mine
                        count++; // if mine found increase count by 1
                    }
                }
                // if count greater than 0, insert number hint into the array
                if (count > 0) {
                    boardArr[row][col] = count;
                    count = 0; // reset count to 0
                }
            }
            //all other tiles
            else {
                if (checkForMine(row, col)) {
                    continue;
                }
                else {
                    if (checkTop(row, col, type)) { //check top of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkBottom(row, col, type)) { //check bottom of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkLeft(row, col, type)) { //check left of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkRight(row, col, type)) { //check right of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkTopLeft(row, col, type)) { //check top left of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkTopRight(row, col, type)) { //check top right of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkBottomLeft(row, col, type)) { //check bottom left of tile for mine
                        count++; // if mine found increase count by 1
                    }
                    if (checkBottomRight(row, col, type)) { //check bottom right of tile for mine
                        count++; // if mine found increase count by 1
                    }
                }
                // if count greater than 0, insert number hint into the array
                if (count > 0) {
                    boardArr[row][col] = count;
                    count = 0; // reset count to 0
                }
            }
        }
    }
}

// this function is called whenever a tile has been left clicked
function tileClick() {
    this.classList.add("clicked"); // add the .clicked class to the clicked tile
    let divId = this.id.split("-"); // store the id of the clicked tile with the hyphen removed
    let row = Number(divId[0]); // take the first item of divId, convert to an int and store in the row variable
    let col = Number(divId[1]); // take the second item of divId, convert to an int and store in the col variable
    if (checkForMine(row, col)) { // if the tile has a mine, call gameOver
        gameOver(this);
    }
    else if (Number.isInteger(boardArr[row][col])) { // checks the boardArr if a mine hint is in that location
        this.innerHTML = boardArr[row][col]; // displays the mine hint on the tile
        this.style.backgroundColor = "#19ad45"; // 'reveals' the tile
    }
    else {
        // if tile is blank
        this.style.backgroundColor = "#19ad45"; // 'reveals' the tile
        checkSurroundingTiles(row, col, "blank"); // calls function to check for more blanks and reveals them         
    }
    // starts the timer
    if (seconds === 0 && !gameOverCalled) { // checks timer hasn't started already and that the first click isn't game over
        seconds = 1; // immediately sets seconds to 1 (before it starts incrementing) to fix bug - see TESTING.md
        document.getElementById("timer").innerHTML = 1; // changes innHTML to 1 to match seconds variable
        timer = setInterval(upTimer, 1000); // sets interval and calls upTimer function every 1 second
    }
    // if the game is won
    if (document.querySelectorAll('#game-board .clicked').length === flatArr.length - mines) { // checks that all tiles have been clicked excluding the mines
        clearInterval(timer); // stops the timer
        disableClick() // calls function to disable all click events
        document.getElementsByClassName("smiley-button")[0].innerHTML = "🥳";
        // sets the best time
        if (bestTime === 0 || seconds < bestTime) {
            bestTime = seconds;
        } 
        // displays modal
        endGameModal.innerHTML = `<h3>You Won!</h3>Your time: ${seconds} seconds<br> Best time: ${bestTime} seconds`
        endGameModal.showModal();
        endGameModal.addEventListener("click", () => {
            endGameModal.close();
        })
    }
}

// increments timer by 1
function upTimer() {
    ++seconds;
    let counter = document.getElementById("timer");
    counter.innerHTML = seconds;
}

// this function is called whenever a tile has been right clicked
function placeFlag() {  
    if (this.classList.contains("clicked")) { // if tile already revealed do not place flag
        return;
    }  
    if (this.innerHTML === "🚩") { // if flag already placed then remove the flag
        this.innerHTML = "";
        $(this).css("text-shadow", "none");
        this.addEventListener('click', tileClick); // add right click event listenter back onto the tile
        document.getElementsByClassName("mine-count")[0].innerHTML ++; // increase mine count display by 1
    }
    else {
        this.innerHTML = "🚩"; // place a flag if tile hasnt been revealed and doesnt have a flag
        $(this).css("text-shadow", "-4px -4px 5px black");
        this.removeEventListener('click', tileClick); // disable right click on this tile
        document.getElementsByClassName("mine-count")[0].innerHTML --; // decrease mine count display by 1
    }
}

// disables click events on all tiles
function disableClick() {
    for (let i = 0; i < flatArr.length; i++) {
        let tile = document.getElementById(flatArr[i])
        tile.classList.add("disable");
    }
}

// ends the game
function gameOver(currentTile) {   
    gameOverCalled = true;
    clearInterval(timer); // stops the timer
    document.getElementsByClassName("smiley-button")[0].innerHTML = "😖";
    // disables click event on the game board
    disableClick();
    // reveal all mines
    revealMines(currentTile);
}

// reveals all mines
function revealMines(currentTile) {
    let resetButtons = document.getElementsByClassName("reset");
    for (let i of resetButtons) { // disable reset buttons while revealing mines
        i.classList.add("disable");
    }
    let mineImage = `<img src="assets/images/minesweeper-logo.png" alt="image of a mine">`;
    currentTile.style.backgroundColor = "#e80202"; // reveal the clicked tile
    currentTile.innerHTML = mineImage;
    let index = mineLocation.indexOf(currentTile.id); // in mineLocation array,get the index of the clicked tile
    mineLocation.splice(index, 1) // remove clicked tile item from array

    let loopCount = 0;
    setTimeout(function() { // sets a delay before revealing the rest of the mines
        for (let j = 0; j < mineLocation.length; j++) { 
            setTimeout(function() { // sets a delay between revealing each mine.
                let reveal = document.getElementById(mineLocation[j]);
                reveal.style.backgroundColor = "#e80202";
                reveal.innerHTML = mineImage;
                loopCount++;
                if (loopCount === mineLocation.length) {
                    for (let i of resetButtons) { // enable reset buttons after revealing mines
                        i.classList.remove("disable");
                    }
                }
            }, j * 200);
        }
    }, 1 * 500); 
}

function checkSurroundingTiles(row, col, type) {
    // if current tile is top left corner
    if (row === 0 && col === 0) {
        checkRight(row, col, type);
        checkBottom(row, col, type);
        checkBottomRight(row, col, type);
    }
    // if current tile is top right corner
    else if (row === 0 && col === (rowLength - 1)) {
        checkLeft(row, col, type);
        checkBottom(row, col, type);
        checkBottomLeft(row, col, type);
    }
    // if current tile is bottom left corner
    else if (row === (colLength - 1) && col === 0) {
        checkRight(row, col, type);
        checkTop(row, col, type);
        checkTopRight(row, col, type);
    }
    // if current tile is bottom right corner
    else if (row === (colLength - 1) && col === (rowLength - 1)) {
        checkLeft(row, col, type);
        checkTop(row, col, type);
        checkTopLeft(row, col, type);
    }    
    // if current tile on top row but not a corner
    else if ((row === 0 && col !== 0) && (row === 0 && col !== (rowLength - 1))) {
        checkRight(row, col, type);
        checkLeft(row, col, type);
        checkBottomLeft(row, col, type);
        checkBottom(row, col, type);
        checkBottomRight(row, col, type);
    }    
    // if current tile on bottom row but not a corner
    else if ((row === (colLength - 1) && col !== 0) && (row === (colLength - 1) && col !== (rowLength - 1))) {
        checkRight(row, col, type);
        checkLeft(row, col, type);
        checkTopLeft(row, col, type);
        checkTop(row, col, type);
        checkTopRight(row, col, type);
    }    
    // if current tile on left column but not a corner
    else if ((col === 0 && row !== 0) && (col === 0 && row !== (colLength - 1))) {
        checkTop(row, col, type);
        checkBottom(row, col, type);
        checkTopRight(row, col, type);
        checkRight(row, col, type);
        checkBottomRight(row, col, type);
    }    
    // if current tile on right column but not a corner
    else if ((row !== 0 && col === (colLength - 1)) && (row !== (rowLength - 1) && col === (rowLength - 1))) {
        checkTop(row, col, type);
        checkBottom(row, col, type);
        checkTopLeft(row, col, type);
        checkLeft(row, col, type);
        checkBottomLeft(row, col, type);
    }    
    // all other tiles
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

// returns true if a mine is in the location
function checkForMine(row, col) {
    let id = row.toString() + "-" + col.toString();
    if (mineLocation.includes(id)) {
    return true;
    }
}

// reveal tile if tile not clicked and not a mine
function checkTile(row, col, type) {
    let id = row.toString() + "-" + col.toString(); //create id string using row and col data
    let tile = document.getElementById(id);
    if (tile.classList.contains("clicked")) { // if tile already clicked, do nothing
        return;
    }
    else if (type === "blank" && boardArr[row][col] === "") { // checks boardArr if position is blank
        tile.classList.add("clicked"); // set tile as clicked
        tile.style.backgroundColor = "#19ad45";
        tile.removeEventListener('click', tileClick); // disable left click     
        checkSurroundingTiles(row, col, "blank"); // call function to check for more blank tiles
    }
    else if (Number.isInteger(boardArr[row][col])) { // checks boardArr if position is a mine hint
        tile.classList.add("clicked"); // set tile as clicked
        tile.style.backgroundColor = "#19ad45";        
        tile.innerHTML = boardArr[row][col]; // display mine hint on revealed tile
        tile.removeEventListener('click', tileClick); // disable left click  
    }
}

// check the tile relative to row and col position
function checkTopLeft(row, col, type) {
    row = row - 1;
    col = col - 1;
    if (type === "mine") {
        return checkForMine(row, col); // return if type is 'mine' and a mine is found
    }
    else { 
        checkTile(row, col, type); // check if tile is blank or a mine hint
    }
}
// check the tile relative to row and col position
function checkTop(row, col, type) {
    row = row - 1;
    if (type === "mine"){
        return checkForMine(row, col); // return if type is 'mine' and a mine is found
    }
    else {
        checkTile(row, col, type); // check if tile is blank or a mine hint
    }
}
// check the tile relative to row and col position
function checkTopRight(row, col, type) {
    row = row - 1;
    col = col + 1;
    if (type === "mine"){
        return checkForMine(row, col); // return if type is 'mine' and a mine is found
    }
    else {
        checkTile(row, col, type); // check if tile is blank or a mine hint
    }
}
// check the tile relative to row and col position
function checkLeft(row, col, type) {
    col = col - 1;
    if (type === "mine"){
        return checkForMine(row, col); // return if type is 'mine' and a mine is found
    }
    else {
        checkTile(row, col, type); // check if tile is blank or a mine hint
    }
}
// check the tile relative to row and col position
function checkRight(row, col, type) {   
    col = col + 1; 
    if (type === "mine"){
        return checkForMine(row, col); // return if type is 'mine' and a mine is found
    }
    else {
        checkTile(row, col, type); // check if tile is blank or a mine hint
    }
}
// check the tile relative to row and col position
function checkBottomLeft(row, col, type) {
    row = row + 1;
    col = col - 1;
    if (type === "mine"){
        return checkForMine(row, col); // return if type is 'mine' and a mine is found
    }
    else {
        checkTile(row, col, type); // check if tile is blank or a mine hint
    }
}
// check the tile relative to row and col position
function checkBottom(row, col, type) {
    row = row + 1;
    if (type === "mine"){
        return checkForMine(row, col); // return if type is 'mine' and a mine is found
    }
    else {
        checkTile(row, col, type); // check if tile is blank or a mine hint
    }
}
// check the tile relative to row and col position
function checkBottomRight(row, col, type) {
    row = row + 1;
    col = col + 1;
    if (type === "mine"){
        return checkForMine(row, col); // return if type is 'mine' and a mine is found
    }
    else {
        checkTile(row, col, type); // check if tile is blank or a mine hint
    }
}

function instantWin() {  
    for (let i = 0; i < flatArr.length; i++) {
        let id = flatArr[i];
        let tile = document.getElementById(id);
        let divId = id.split("-"); // store the id of the clicked tile with the hyphen removed
        let row = Number(divId[0]); // take the first item of divId, convert to an int and store in the row variable
        let col = Number(divId[1]); // take the second item of divId, convert to an int and store in the col variable
        
        if (mineLocation.includes(id)) {
            continue
        } else if (Number.isInteger(boardArr[row][col])) { // checks the boardArr if a mine hint is in that location
            tile.innerHTML = boardArr[row][col]; // displays the mine hint on the tile
            tile.style.backgroundColor = "#19ad45"; // 'reveals' the tile
            tile.classList.add("clicked"); // add the .clicked class to the clicked tile
        }
        else {
            // if tile is blank
            tile.style.backgroundColor = "#19ad45"; // 'reveals' the tile   
            tile.classList.add("clicked"); // add the .clicked class to the clicked tile 
        }
    }
    // if the game is won
    if (document.querySelectorAll('#game-board .clicked').length === flatArr.length - mines) { // checks that all tiles have been clicked excluding the mines
        clearInterval(timer); // stops the timer
        disableClick() // calls function to disable all click events
        document.getElementsByClassName("smiley-button")[0].innerHTML = "🥳";
        // sets the best time
        if (bestTime === 0 || seconds < bestTime) {
            bestTime = seconds;
        } 
        // displays modal
        endGameModal.innerHTML = `<h3>You Won!</h3>Your time: ${seconds} seconds<br> Best time: ${bestTime} seconds`
        endGameModal.showModal();
        endGameModal.addEventListener("click", () => {
            endGameModal.close();
        })
    }
}