/* jshint esversion: 11, jquery: true */

/**
 * @jest-environment jsdom
 */

const { test, expect } = require("@jest/globals");

let resetGame;
let setMines;
let createGrid;
let gameOverCalled;
let seconds;

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("game.html", "utf-8");
    document.open();
    document.write(fileContents);
    resetGame = require('../game.js').resetGame;
    setMines = require('../game.js').setMines;
    createGrid = require('../game.js').createGrid;
    gameOverCalled = require('../game.js').gameOverCalled;
    seconds = require('../game.js').seconds;
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
        let boardArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let mines = 8;
        mineLocation = setMines(mines, boardArr);
        expect(mineLocation).toHaveLength(8);
    });
});

describe("createGrid works correctly", () => {
    test("boardArr length is 8", () => {
        let boardArr = [];
        let tileCount = 8;
        boardArr = createGrid(tileCount);
        expect(boardArr).toHaveLength(8);
    });
});