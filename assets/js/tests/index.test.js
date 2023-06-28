/* jshint esversion: 11, jquery: true */

/**
 * @jest-environment jsdom
 */

beforeEach(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("DOM test", () => {
    test("h1 should exist", () => {
        expect(document.getElementsByTagName("h1").length).toBe(1);
    });
    test("img should exist", () => {
        expect(document.getElementsByTagName("img").length).toBe(1);
    });
    test("h2 should exist", () => {
        expect(document.getElementsByTagName("h2").length).toBe(2);
    });
    test("span should exist", () => {
        expect(document.getElementsByTagName("span").length).toBe(8);
    });
    test("footer should exist", () => {
        expect(document.getElementsByTagName("footer").length).toBe(1);
    });
});