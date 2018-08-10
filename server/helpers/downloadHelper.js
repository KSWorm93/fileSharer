const fs = require('fs');

module.exports = {
    downloadFile: downloadFile
}

/**
 * Downloads a file
 * @param {*} response HTTP response object 
 * @param {*} fileId File name
 * @param {*} file FIle path
 */
function downloadFile(response, fileId, file) {
    response.setHeader('Content-disposition', 'attachment; filename=' + fileId);
    response.setHeader('Content-Type', 'application/audio/mpeg3');
    var rstream = fs.createReadStream(file);
    rstream.pipe(response);
}
//TODO - Implement usage of minetypes
// https://adrianmejia.com/blog/2016/08/24/building-a-node-js-static-file-server-files-over-http-using-es6/

const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
};