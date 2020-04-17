var express = require("express");
var fs = require("fs");
var path = require("path");

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

app.get("/farleysapi/notes", function (req, res) {
    fs.readFileSync(path.join(__dirname, "db/db.json"), function(err, data) {
        if (err) throw err;
        var value = JSON.parse(data);
        res.json(value);
    });
});

app.post("farleysapi/notes", function (req, res) {
    var postNote = req.body;
    fs.readFileSync(path.join(__dirname, "db/db.json"), function(err, data) {
        if (err) throw err
        var value = JSON.parse(data);
        value.push(postNote);
        fs.writeFileSync(path.join(__dirname, "db/db.json"), JSON.stringify(value), function(err, data) {
            if (err) throw err;
            res.JSON(value);
        });
    });
});

app.delete("farleysapi/notes/:id", function(req, res) {
    var deleteNote = req.params.id;
    console.log(deleteNote);
    fs.readFileSync(path.join(__dirname, "../../../db/db.json"), function(err, data) {
        if (err) throw err;
        var value = JSON.parse(data);
        value.splice(deleteNote);
        fs.writeFileSync(path.join(__dirname, "../../../db/db.json"), JSON.stringify(value), function (err, data) {
            if (err) throw err;
            res.JSON(value);
        });
    });
});

app.listen(PORT, function () {
    console.log("App listening on localhost: " + PORT)
});