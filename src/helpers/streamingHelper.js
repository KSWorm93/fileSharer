const fs = require('fs');
const files = require('../utilities/fileUtilities.js')

module.exports = {
    streamFile: streamFile
}

/**
 * Stream specified file from specified path
 * @param {*} response HTTP response object 
 * @param {string} fileName File name
 * @param {string} filePath File path
 */
function streamFile(response, request, stats, fileName, filePath) {
    const extension = files.getFileExtension(filePath);
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
        "Content-Type": files.getMimeType(extension)
    });

    const stream = fs.createReadStream(filePath, { start: start, end: end })
        .on("open", function () {
            stream.pipe(response);
        }).on("error", function (err) {
            stream.close();
            response.end(err);
        });
}