const contentLoader = require('../helpers/contentLoadHelper.js');
const errors = require('../helpers/errorHelper.js')
const files = require('../helpers/fileUtilities.js')
const globals = require('../../server.js');
const { URL } = require('url');
const path = require('path');
const fs = require('fs');

module.exports = {
    contentRoute: content,
    streamRoute: stream,
    fileRoute: file,
    redirectRoute: redirect,
    sendFileRoute: sendFile
}

/**
 * Add route for file loading content
 * @param {string} returnPath Sets return link
 * @param {string} route Route to look for content
 * @param {string} title Set window title
 * @param {boolean} findFiles Default=false - If looking for files
 * @param {string} view Default=files - Which view to render
 */
function content(returnPath, route, title, findFiles = false, view = 'files') {
    globals.app.get(route, function (request, response) {
        response.render(view, {
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

/**
 * Add route for streaming content
 * @param {string} route  Route to look for content
 * @param {string} view Default=videoStream - Which view to render
 */
function stream(route, view = 'videoStream'){
    globals.app.get(route, function (request, response) {
        const dir = new URL(request.headers.referer).pathname;
        response.render(view, {
            title: files.capitalFirstLetter(files.removeExtension(request.query.id)),
            stream: request.query.id,
            dir: dir
        });
    });
}

/**
 * Add route for download/stream of files
 * @param {string} route Route to register
 * @param {function} functionToExecute Function that will be executed
 */
function file(route, functionToExecute){
    globals.app.get(route, function (request, response) {
        const subDir = new URL(request.headers.referer).pathname;
        const fileName = request.query.id;
        let filePath = (globals.shared + subDir + '/' + fileName).replace('%20', ' ');
        if(request.query.dir) { filePath = filePath.replace('streamDirect', request.query.dir) }
        
        fs.stat(filePath, function (error, stats) {
            if (error == null) {
                functionToExecute(response, request, stats, fileName, filePath);
            } else if (error.code == 'ENOENT') {
                errors.errorPage(response, fileName, '404', 'Not found');
            } else {
                errors.errorPage(response, "Something went completely wrong", '500', 'Server error');
            }
        });
    }); 
}

/**
 * Will send a HTML file directly, without rendering
 * @param {string} route Route to register
 * @param {string} view HTML file to send
 */
function sendFile (route, view) {
    globals.app.get(route, function(request, response) {
        response.sendFile(path.resolve(globals.public + view));
    })
}

/**
 * Add redirect route
 * @param {string} route Route to register
 * @param {string} redirect Route to redirect to
 */
function redirect(route, redirect) {
    globals.app.get(route, function (request, response) {
        response.redirect(redirect);
    })
}