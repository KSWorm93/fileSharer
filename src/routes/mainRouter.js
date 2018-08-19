const fs = require('fs');
const path = require('path');
const errors = require('../helpers/errorHelper.js');
const download = require('../helpers/downloadHelper.js');
const routeHelper = require('../helpers/routeHelper.js')
const { URL } = require('url');

module.exports = function (app, dirName, sharedDir) {
    app.get("/", function (request, response) {
        response.sendFile(path.resolve(dirName + 'index.html'));
    });

    app.get("/home", function (reqeust, response) {
        response.redirect("/")
    });

    routeHelper.addRoute('home', '/books', 'Books');
    routeHelper.addRoute('home', '/movies', 'Movies');
    routeHelper.addRoute('home', '/music', 'Music');
    routeHelper.addRoute('home', '/games', 'Games');
    routeHelper.addRoute('home', '/shows', 'Shows');
    routeHelper.addRoute('home', '/pictures', 'Pictures');

    app.get('/download', function (request, response) {
        const referenceUrl = new URL(request.headers.referer);
        const fileName = request.query.id;
        const subDir = referenceUrl.pathname;
        const file = (sharedDir + subDir + '/' + fileName).replace('%20', ' ');

        fs.stat(file, function (error, stats) {
            if (error == null) {
                download.downloadFile(response, fileName, file);
            } else if (error.code == 'ENOENT') {
                errors.errorPage(response, fileName, '404', 'Not found');
            } else {
                errors.errorPage(response, "Something went completely wrong", '500', 'Server error');
            }
        });
    });

    app.get('/stream', function (request, response) {
        const referenceUrl = new URL(request.headers.referer);
        const fileName = request.query.id;
        const subDir = referenceUrl.pathname;
        const file = (sharedDir + subDir + '/' + fileName).replace('%20', ' ');

        //var file = path.resolve(__dirname, "movie.mp4");
        fs.stat(file, function (error, stats) {
            if (error == null) {
                var range = request.headers.range;
                if (!range) {
                    // 416 Wrong range
                    return response.sendStatus(416);
                }
                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                var total = stats.size;
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end - start) + 1;
                
                response.writeHead(206, {
                    "Content-Range": "bytes " + start + "-" + end + "/" + total,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunksize,
                    "Content-Type": "video/avi"
                });

                var stream = fs.createReadStream(file, { start: start, end: end })
                    .on("open", function () {
                        stream.pipe(response);
                    }).on("error", function (err) {
                        response.end(err);
                    });
            } else if (error == 'ENOENT') {
                errors.errorPage(response, fileName, '404', 'Not found');
            } else {
                errors.errorPage(response, "Something went completely wrong", '500', 'Server error');
            }
        });


    });
}