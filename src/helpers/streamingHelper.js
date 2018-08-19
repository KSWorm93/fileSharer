const fs = require('fs');

module.exports = {
    streamFile: streamFile
}

/**
 * Downloads specified file from specified path
 * @param {*} response HTTP response object 
 * @param {*} fileName File name
 * @param {*} filePath File path
 */
function streamFile(response, fileName, filePath) {
    const extension = fileExtension(filePath);
    const rstream = fs.createReadStream(filePath);

    response.setHeader('Content-disposition', 'attachment; filename=' + fileName);
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