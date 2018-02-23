const express = require("express");

module.exports = function (app, dirName) {

    /**
     * Routes
     */
    app.get("/", function (request, response) {
        response.sendFile(dirName + 'index.html');
    });

    app.get("/books", function (request, response) {
        response.render('files', {title: 'Books', subPart: 'home'})
    });

    app.get("/movies", function (request, response) {
        response.render('files', {title: 'Movies', subPart: 'home'})
    });

    app.get("/games", function (request, response) {
        response.render('files', {title: 'Games', subPart: 'home'})
    });

}