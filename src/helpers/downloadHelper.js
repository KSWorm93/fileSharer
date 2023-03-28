const fs = require('fs');
const files = require('../utilities/fileUtilities.js')

module.exports = {
    downloadFile: downloadFile
}

/**
 * Download specified file from specified path
 * @param {*} response HTTP response object 
 * @param {string} fileName File name
 * @param {string} filePath File path
 */
function downloadFile(response, request, stats, fileName, filePath) {
    const extension = files.getFileExtension(filePath);
    const rstream = fs.createReadStream(filePath);

    response.setHeader('Content-disposition', 'attachment; filename=' + fileName);
    response.setHeader('Content-Type', files.getMimeType(extension) || 'text/plain');
    rstream.pipe(response);
}