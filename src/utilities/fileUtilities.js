module.exports = {
    capitalFirstLetter: toCapital,
    capitalAll: allToCapital,
    removeExtension: removeExtension,
    getFileExtension: fileExtension,
    getMimeType: mimeType,
    getFileName: getName,
    replaceSymbol: replaceSymbol,
    urlEncode: urlEncode,
    urlDecode: urlDecode
}

/**
 * Upper cases first letter
 * @param {string} string 
 */
function toCapital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Upper cases all words in string
 * @param {*} string 
 */
function allToCapital(string) {
    return string.replace(/\b\w/g, l => l.toUpperCase())
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

/**
 * Returns file name by getting last element after '/'
 * @param {string} filePath full file path to file
 */
function getName(filePath) {
    return /[^/]*$/.exec(filePath)[0];
}

function replaceSymbol(text, symbol, replacement) {
    return text.split(symbol).join(replacement);
}

function urlEncode(text) {
    let url = text;
    url = replaceSymbol(url, ' ', '%20');
    url = replaceSymbol(url, '(', '[(]')
    url = replaceSymbol(url, ')', '[)]')
    return url;
}

function urlDecode(text) {
    let url = text;
    url = replaceSymbol(url, '%20', ' ');
    url = replaceSymbol(url, '[(]', '(');
    url = replaceSymbol(url, '[)]', ')');

    return url;
}

// https://www.freeformatter.com/mime-types-list.html
/**
 * Object containing all string mimetypes
 */
function mimeType(extension) {
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