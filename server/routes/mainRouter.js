const fs = require('fs');
const path = require('path');
const errors = require('../helpers/errorHelper.js');
const download = require('../helpers/downloadHelper.js');
const { URL } = require('url');

module.exports = function (app, dirName, sharedDir) {
    app.get("/", function (request, response) {
        response.sendFile(path.resolve(dirName + 'index.html'));
    });

    app.get("/home", function (reqeust, response) {
        response.redirect("/")
    });

    app.get("/books", function (request, response) {
        response.render('files', { title: 'Books', subPart: 'home' })
    });

    app.get("/movies", function (request, response) {
        response.render('files', { title: 'Movies', subPart: 'home' })
    });

    app.get("/games", function (request, response) {
        response.render('files', { title: 'Games', subPart: 'home' })
    });

    app.get("/shows", function (request, response) {
        response.render('files', { title: 'Shows', subPart: 'home' })
    });

    app.get("/pictures", function (request, response) {
        response.render('files', { title: 'Pictures', subPart: 'home' })
    });

    app.get('/download', function (request, response) {
        const referenceUrl = new URL(request.headers.referer);
        const fileName = request.query.id;
        const subDir = referenceUrl.pathname;
        const file = sharedDir + subDir + '/' + fileName;

        fs.stat(file, function (error, stat) {
            if (error == null) {
                download.downloadFile(response, fileName, file);
            } else if (error.code == 'ENOENT') {
                errors.errorPage(response, fileName, '404', 'Not found');
            } else {
                errors.errorPage(response, "Something went completely wrong", '500', 'Server error');
            }
        });
    });
}