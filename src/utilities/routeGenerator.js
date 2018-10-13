const fs = require('fs');
const content = require('../helpers/contentLoadHelper.js');
const files = require('../utilities/fileUtilities.js');

module.exports = {
    generateRoutes: generateRoutes
}

function generateRoutes() {
    const location = __dirname + '/..' + '/routes/';
    const shared = __dirname + '/../..' + '/files/';
    let fileName = 'test.js';
    let fileContent = 'test';

    
    const fileDirs = content.getContent(shared)
    console.log(fileDirs)

    fileDirs.forEach(directory => {
        fileName = directory + '.js';
        fileContent = '';
        fileContent += addImports();
        fileContent += addNewline();
        fileContent += addModuleExportsStart();

        const subDirs = content.getContent(shared + directory);
        console.log(subDirs);

        subDirs.forEach(subDir => {
            const subSubDirs = content.getContent(shared + directory + '/' + subDir);

            console.log(subSubDirs);
            const route = '/' + directory + '';
            const title = files.capitalAll(directory);
            fileContent += addContentRoute(directory, route + title);
            fileContent += addNewline();

        })

        fileContent += addNewline();
        fileContent += addModuleExportsEnd();

        fs.writeFile(location + fileName, fileContent, function (error) {
            if (error) {
                return console.log(error)
            }

            console.log(filename + " created with this content: " + fileContent);
        })

    });
}

function addImports() {
    return "const routeHelper = require('../helpers/routeHelper.js');"
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
    return "routeHelper.contentRoute('" + returnPath + "', '" + route + "', '" + title + "')";
}