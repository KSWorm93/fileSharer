const fileUtil = require('../utilities/fileUtilities.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    readContent: readContentFromDir,
    getContent: readContent,
    renderView: render
}

/**
 * Read content from given path
 * @param {*} sharedDir Location for shared directory
 * @param {*} dir Directory to look at
 */
function readContentFromDir(sharedDir, dir, dirOnly = false) {
    dir = fileUtil.urlDecode(dir);

    if (dirOnly) return readContent(sharedDir + dir, getFilter('directory'))
    return readContent(sharedDir + dir, getFilter('file'))
}

/**
 * Get content for given directory
 * Option to send a filter that only finds elements of a given type
 * @param {string} source directory source to look up
 * @param {function} filter optional filter function for specific elements
 */
function readContent(source, filter = getFilter('directory')) {
    return fs.readdirSync(source)
        .map(element => path.join(source, element))
        .filter(filter)
        .map(element => fileUtil.getFileName(element))
}

function getFilter(filter) {
    const filterFunctions = {
        'file': source => fs.lstatSync(source).isFile(),
        'directory': source => fs.lstatSync(source).isDirectory()
    }
    return filterFunctions[filter]
}

function render(response, view, title, route, returnPath, findFiles, files, subDirs) {
    response.render(view, {
        title: title,
        prefix: route,
        returnPath: fileUtil.urlDecode(returnPath),
        path: 'iWillFail.png',
        loadFiles: findFiles,
        loadgenre: !findFiles,
        files: files,
        subDirs: subDirs
    });
}