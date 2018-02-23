const express = require("express");

module.exports = function (app, dirName) {

    /**
     * Routes
     */   
    app.get("/books/genre/adventure", function (request, response) {
        response.render('files', {title: 'Adventure', subPart: 'books'})
    });
}