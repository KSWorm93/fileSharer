const fs = require('fs');
const content = require('../helpers/contentLoadHelper.js');
const files = require('../utilities/fileUtilities.js');

module.exports = {
    generateRoutes: generateRoutes
}

generateRoutes();

function generateRoutes() {
    const location = __dirname + '/..' + '/routes/';
    const shared = __dirname + '/../..' + '/files/';

    const sharedDirs = content.getContent(shared)
    sharedDirs.forEach(directory => {
        const fileName = directory + 'Router' + '.js';
        let fileContent = '';

        fileContent += addAutoGeneratedText();
        fileContent += addNewline();
        fileContent += addImports();
        fileContent += addNewline();
        fileContent += addNewline();
        fileContent += addModuleExportsStart();
        fileContent += addNewline();

        const genresAndArtistDirs = content.getContent(shared + directory);
        genresAndArtistDirs.forEach(subDir => {
            const route = '/' + directory + '/' + subDir;
            const title = files.capitalAll(subDir);

            fileContent += addContentRoute(directory, route, title);
            fileContent += addNewline();

            const albumDirs = content.getContent(shared + directory + '/' + subDir);
            albumDirs.forEach(subSubDir => {
                const route = '/' + subDir + '/' + subSubDir;
                const title = files.capitalAll(subSubDir);

                fileContent += addContentRoute(directory + '/' + subDir, route, title);
                fileContent += addNewline();
            })
        })

        fileContent += addModuleExportsEnd();

        fs.writeFile(location + fileName, fileContent, function (error) {
            if (error) {
                return console.log(error)
            }
            console.log(fileName + " created");
        })

    });
}

function addAutoGeneratedText() {
    return '/* This file was autogenerated by src/utilities/routeGenerator.js */'
}

function addImports() {
    return 'const routeHelper = require("../helpers/routeHelper.js");'
}

function addNewline() {
    return "\n";
}

function addModuleExportsStart() {
    return "module.exports = function () {"
}

function addModuleExportsEnd() {
    return "}"
}

function addContentRoute(returnPath, route, title) {
    return '\trouteHelper.contentRoute("' + files.replaceSymbol(returnPath, " ", "%20") + '", "' + files.replaceSymbol(route, " ", "%20") + '", "' + title + '");';
}