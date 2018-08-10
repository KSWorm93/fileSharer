const fs = require('fs');
const path = require('path');
const errors = require('../helpers/errorHelper.js')
const download = require('../helpers/downloadHelper.js')

module.exports = function (app, dirName, sharedDir) {

    /**
     * Routes
     */
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

    app.get('/download', function (request, response) {
        const fileId = request.query.id;
        const file = sharedDir + 'Pictures/' + fileId;

        fs.stat(file, function (error, stat) {
            if (error == null) {
                download.downloadFile(response, fileId, file);
            } else if (error.code == 'ENOENT') {
                errors.errorPage(response, fileId, '404', 'Not found');
            } else {
                errors.errorPage(response, "Something went completely wrong", '500', 'Server error');
            }
        });
    });
}