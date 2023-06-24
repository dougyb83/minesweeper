/**
 * @jest-environment jsdom
 */

let resetGame;
let gameOverCalled;
let seconds;
let boardArr;
let flatArr;
let mineLocation;


beforeEach(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("game.html", "utf-8");
    document.open();
    document.write(fileContents);
    resetGame = require('../game.js').resetGame;
    gameOverCalled = require('../game.js').gameOverCalled;
    seconds = require('../game.js').seconds;
    boardArr = require('../game.js').boardArr;
    flatArr = require('../game.js').flatArr;
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
        boardArr = [1, 2, 3, 4, 5, 1];
        flatArr = ['0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '0-7', '1-0', '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '2-0', '2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7', '3-0', '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7', '4-0', '4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7', '5-0', '5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7', '6-0', '6-1', '6-2', '6-3', '6-4', '6-5', '6-6', '6-7', '7-0', '7-1', '7-2', '7-3', '7-4', '7-5', '7-6', '7-7'];
        mineLocation = ['7-3', '7-4', '0-7', '2-1', '3-5', '0-1', '7-5', '3-4'];
        resetGame();
    });
    // test("gameOverCalled should be set to false", () => {
    //     expect(gameOverCalled).toBe(false);
    // });
    // test("seconds should be set to 0", () => {
    //     expect(seconds).toBe(0);
    // });
    test("boardArr should be empty", () => {
        expect(boardArr).toHaveLength(0);
    });
    // test("flatArr should be empty", () => {
    //     expect(flatArr).toHaveLength(0);
    // });
    // test("mineLocation should be empty", () => {
    //     expect(mineLocation).toHaveSize(0);
    // });
});