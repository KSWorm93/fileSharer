const files = require('../utilities/fileUtilities.js');
const fs = require('fs');
const path = require('path');


module.exports = {
    readContent: readContentFromDir,
    getContent: getContent
}

/**
 * Read content from given path
 * @param {*} sharedDir Location for shared directory
 * @param {*} dir Directory to look at
 */
function readContentFromDir(sharedDir, dir, dirOnly = false) {
    dir = files.urlDecode(dir);

    console.log(dir)
    console.log(sharedDir + dir)

    if (dirOnly) return getContent(sharedDir + dir, getFilter('directory'))
    return getContent(sharedDir + dir, getFilter('file'))
}

function getContent(source, filter = getFilter('directory')) {
    return fs.readdirSync(source)
        .map(element => path.join(source, element))
        .filter(filter)
        .map(element => files.getFileName(element))
}

function getFilter(filter) {
    const filterFunctions = {
        'file': source => fs.lstatSync(source).isFile(),
        'directory': source => fs.lstatSync(source).isDirectory()
    }
    return filterFunctions[filter]
}