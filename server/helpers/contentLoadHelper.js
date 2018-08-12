const fs = require('fs');

module.exports = {
    readContent: readContentFromDir
}

/**
 * Read content from given path
 * @param {*} sharedDir Location for shared directory
 * @param {*} dir Directory to look at
 */
function readContentFromDir(sharedDir, dir) {
    dir = dir.replace('%20', ' ');
    return fs.readdirSync(sharedDir + dir);
}
