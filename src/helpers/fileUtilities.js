module.exports = {
    capitalFirstLetter: toCapital,
    removeExtension: removeExtension,
    getFileExtension: fileExtension,
    getMimeType: mimeType
}

/**
 * Upper cases first letter
 * @param {string} string 
 */
function toCapital (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Remove file extension
 * @param {string} file 
 */
function removeExtension(file) {
    return file.substring(0, file.indexOf('.'));
}

/**
 * Returns the file extension
 * for the given file
 * @param {string} file 
 */
function fileExtension(file) {
    return file.slice((file.lastIndexOf(".") - 1 >>> 0) + 2);
}

// https://www.freeformatter.com/mime-types-list.html
/**
 * Object containing all string mimetypes
 */
function mimeType (extension) {
    const mimeType = {
        'ico': 'image/x-icon',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'mp3': 'audio/mpeg',
        'avi': 'video/avi',
        'mp4': 'video/mp4',
        'pdf': 'application/pdf',
        'doc': 'application/msword'
    }
    return mimeType[extension];
};