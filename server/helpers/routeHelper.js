const contentLoader = require('../helpers/contentLoadHelper.js');
const globals = require('../../server.js');

module.exports = {
    addRoute: addRoute
}

/**
 * Add route to app instance
 * @param {string} returnPath Sets return link
 * @param {string} route Route to look for content
 * @param {string} title Set window title
 * @param {boolean} findFiles True if looking for files
 * @param {string} file OPTIONAL - Which view to render
 */
function addRoute(returnPath, route, title, findFiles = false, file = 'files') {
    globals.app.get(route, function (request, response) {
        response.render(file, {
            title: title,
            prefix: '/' + title.toLowerCase() + '/',
            returnPath: returnPath,
            path: 'iWillFail.png',
            loadFiles: findFiles,
            loadgenre: !findFiles,
            files: contentLoader.readContent(globals.shared, route),
            subDirs: contentLoader.readContent(globals.shared, route)
        });
    });
}