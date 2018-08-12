const fs = require('fs');

module.exports = {
    readContent: readContentFromDir,
}

//TODO - Load directories, to be used with genres, subdirectories, etc
/**
 * Read content from given path
 * @param {*} sharedDir Start location of shared directory
 * @param {*} dir Directory to look at
 */
function readContentFromDir(sharedDir, dir) {
    return fs.readdirSync(sharedDir + dir);
}
