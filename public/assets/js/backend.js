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

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../notes.html"));
  });