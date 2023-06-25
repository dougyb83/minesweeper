/**
 * @jest-environment jsdom
 */

let resetGame;
let setMines;
let createGrid;
let gameOverCalled;
let seconds;
let checkForMine;
let placeMineHints;
let mineLocation;

beforeEach(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("game.html", "utf-8");
    document.open();
    document.write(fileContents);
    resetGame = require('../game.js').resetGame;
    setMines = require('../game.js').setMines;
    createGrid = require('../game.js').createGrid;
    gameOverCalled = require('../game.js').gameOverCalled;
    checkForMine = require('../game.js').checkForMine;
    seconds = require('../game.js').seconds;
    placeMineHints = require('../game.js').placeMineHints;
    mineLocation = require('../game.js').mineLocation;
    document.close();
});

describe("DOM test", () => {
    test("h2 should exist", () => {
        expect(document.getElementsByTagName("h2").length).toBe(1);
    });
    test("controls should exist", () => {
        expect(document.getElementsByClassName("controls").length).toBe(1);
    });
    test("info-display should exist", () => {
        expect(document.getElementsByClassName("info-display").length).toBe(1);
    });
    test("game-board should exist", () => {
        expect(document.getElementsByClassName("game-board").length).toBe(1);
    });
    test("footer should exist", () => {
        expect(document.getElementsByTagName("footer").length).toBe(1);
    });

});

describe("resetGame works correctly", () => {
    beforeAll(() => {
        gameOverCalled = true;
        seconds = 35;
        resetGame();
    });
    test("gameOverCalled should be set to false", () => {
        expect(gameOverCalled).toBe(false);
    });
    test("seconds should be set to 0", () => {
        expect(seconds).toBe(0);
    });
});

describe("setMines works correctly", () => {
    test("mineLocation length is 8", () => {
        boardArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        mines = 8;
        mineLocation = setMines(mines, boardArr);
        expect(mineLocation).toHaveLength(8);
    });
});

describe("createGrid works correctly", () => {
    test("boardArr length is 8", () => {
        boardArr = [];
        tileCount = 8;
        boardArr = createGrid(tileCount);
        expect(boardArr).toHaveLength(8);
    });
});