var express = require("express");
var fs = require("fs");
var path = require("path");

var app = express();
var PORT = process.env.port || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../notes.html"));
});

app.get("/farleysapi/notes", function (req, res) {
    fs.readFileSync(path.join(__dirname, "../../../db/db.json"), function(err, data) {
        if (err) throw err;
        var value = JSON.parse(data);
        res.json(value);
    });
});

app.post("farleysapi/notes", function (req, res) {
    var note = req.body;
    fs.readFileSync(path.join(__dirname, "../../../db/db.json"), function(err, data) {
        if (err) throw err
        var value = JSON.parse(data);
        value.push(note);
        fs.writeFileSync(path.join(__dirname, "../../../db/db.json"), JSON.stringify(value), function(err, data) {
            if (err) throw err;
            res.JSON(value);
        });
    });
});

