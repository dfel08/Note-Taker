var express = require("express");
var fs = require("fs");
var path = require("path");
const { v4: uuidv4 } = require('uuid'); 

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "db/db.json"), function(err, data) {
        if (err) throw err;
        var value = JSON.parse(data);
        res.json(value);
    });
});

app.post("/api/notes", function (req, res) {
    var postNote = req.body;
    postNote.id = uuidv4();
    fs.readFile(path.join(__dirname, "db/db.json"), function(err, data) {
        if (err) throw err
        var value = JSON.parse(data);
        value.push(postNote);
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(value), function(err, data) {
            if (err) throw err;
            res.json(value);
        });
    });
});

app.delete("/api/notes/:id", function(req, res) {
    var deleteNote = req.params.id;
    fs.readFile(path.join(__dirname, "db/db.json"), function(err, data) {
        if (err) throw err;
        var value = JSON.parse(data);
        console.log(value);
        var result = value.filter(note => note.id !== deleteNote)
        console.log(result);
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(result), function (err, data) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.listen(PORT, function () {
    console.log("App listening on localhost: " + PORT)
});