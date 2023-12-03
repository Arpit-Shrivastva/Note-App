const expect = require("chai").expect;
const fs = require("fs");

const axios = require("axios");
const axiosMock = require("axios-mock-adapter");
const { JSDOM } = require("jsdom");

describe("Solution", function () {
    let scriptFileContents;
    let script;

    before(function () {
        scriptFileContents = fs.readFileSync("./solution/js/script.js", 'utf8');
        fs.writeFileSync("./solution/js/script.js", "\nconst axios = require('axios');\n" + scriptFileContents, () => { });
        script = require("../solution/js/script");
        return JSDOM.fromFile('./solution/index.html')
            .then((dom) => {
                global.window = dom.window;
                global.document = window.document;
                jsDom = dom;
            });
    });

    it("should have function with the name `saveNote`", function () {
        expect(typeof script.saveNote).to.be.equal("function");
    });
    it("should have function with the name `displayNotes`", function () {
        expect(typeof script.displayNotes).to.be.equal("function");
    });
    it("should have function with the name `fetchNotesFromServer`", function () {
        expect(typeof script.fetchNotesFromServer).to.be.equal("function");
    });
    it("should have function with the name `saveNoteToServer`", function () {
        expect(typeof script.saveNoteToServer).to.be.equal("function");
    });

    it("should allow adding a new note and display the contents of the new note on the page", function (done) {

        new axiosMock(axios).onPost("http://localhost:3000/todos").reply(201, {
            id: "101",
            title: "dummy note",
            content: "this is a dummy note"
        });
        let note = {
            id: "101",
            title: "dummy note",
            content: "this is a dummy note"
        };
        script.saveNoteToServer(note);
        setTimeout(() => {
            expect(document.getElementById("note-container").textContent).to.contain("dummy note");
            expect(document.getElementById("note-container").textContent).to.contain("this is a dummy note");
            done();
        });
    });

    it("should display all the existing notes", function (done) {

        new axiosMock(axios).onGet("http://localhost:3000/todos").reply(200, [{
            id: "101",
            title: "dummy note",
            content: "this is a dummy note"
        }, {
            id: "102",
            title: "test note",
            content: "this is a test note"
        }]);

        script.fetchNotesFromServer();
        setTimeout(() => {
            expect(document.getElementById("note-container").textContent).to.contain("dummy note");
            expect(document.getElementById("note-container").textContent).to.contain("this is a dummy note");
            expect(document.getElementById("note-container").textContent).to.contain("test note");
            expect(document.getElementById("note-container").textContent).to.contain("this is a test note");
            done();
        });
    });
    after(function () {
        script = null;
        fs.writeFileSync("./solution/js/script.js", scriptFileContents);
    })

});