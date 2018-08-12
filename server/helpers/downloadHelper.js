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
    const extension = fileExtension(file);
    const rstream = fs.createReadStream(file);

    response.setHeader('Content-disposition', 'attachment; filename=' + fileId);
    response.setHeader('Content-Type', mimeType[extension] || 'text/plain');
    rstream.pipe(response);
}

// https://www.freeformatter.com/mime-types-list.html
/**
 * Object containing all string mimetypes
 */
const mimeType = {
    'ico': 'image/x-icon',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'mp3': 'audio/mpeg',
    'avi': 'video/avi',
    'pdf': 'application/pdf',
    'doc': 'application/msword'
};

/**
 * Returns the file extension
 * for the given file
 * @param {string} file 
 */
function fileExtension(file) {
    return file.slice((file.lastIndexOf(".") - 1 >>> 0) + 2);
}