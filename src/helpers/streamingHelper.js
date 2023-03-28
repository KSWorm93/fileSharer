const fs = require('fs');
const getMimeType = require('../utilities/fileUtilities.js').getMimeType;
const getFile = require('./contentLoader').getFOF;

module.exports = {
    stream: stream
}

//TODO - fix bug with reload not always working??? :D
//TODO - error handling, atm right click to open video in new tab - breaks :D

function stream(response, request) {
    getFile(request.params.type, request.params.id).then(function (file) {
        console.log('file')
        console.log(file)
        file = file[0];
        var filePath = file.location;
        console.log('streaming now plz')
        fs.stat(filePath, function (error, stats) {
            if (error == null) {
                streamFile(response, request, stats, filePath);
            } else if (error.code == 'ENOENT') {
                errors.errorPage(response, file.title + ' ' + file.year, '404', 'Not found');
            } else {
                errors.errorPage(response, "Something went completely wrong", '500', 'Server error');
            }
        });
    });
}

/**
 * Stream specified file from specified path
 * @param {*} response HTTP response object 
 * @param {string} fileName File name
 * @param {string} filePath File path
 */
function streamFile(response, request, stats, filePath) {
    const range = request.headers.range;
    const positions = range.replace(/bytes=/, "").split("-");
    const start = parseInt(positions[0], 10);
    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    const chunksize = (end - start) + 1;

    response.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": getMimeType(filePath)
    });

    const stream = fs.createReadStream(filePath, { start: start, end: end })
        .on("open", function () {
            stream.pipe(response);
        }).on("error", function (err) {
            stream.close();
            response.end(err);
        });
}