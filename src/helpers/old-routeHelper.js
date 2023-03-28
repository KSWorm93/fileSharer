const contentLoader = require('../helpers/contentLoadHelper.js');
const errors = require('../helpers/errorHelper.js')
const fileUtil = require('../utilities/fileUtilities.js')
const globals = require('../../server.js');
const { URL } = require('url');
const path = require('path');
const fs = require('fs');
const database = require('../helpers/databaseHelper.js');

module.exports = {
    contentRoute: content,
    streamRoute: stream,
    fileRoute: file,
    redirectRoute: redirect,
    sendFileRoute: sendFile,
    recieveRoute: receive,
    searchRoute: search
}

//TODO - Look into routes with [] in their names, seems to not work...

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
        let files = contentLoader.readContent(globals.shared, route);
        let subDirs = contentLoader.readContent(globals.shared, route, true);
        contentLoader.renderView(response, view, title, route, returnPath, findFiles, files, subDirs);
    });
}

/**
 * Add route for streaming content
 * @param {string} route  Route to look for content
 * @param {string} view Default=videoStream - Which view to render
 */
function stream(route, view = 'videoStream') {
    globals.app.get(route, function (request, response) {
        const dir = new URL(request.headers.referer).pathname;
        response.render(view, {
            title: fileUtil.capitalFirstLetter(fileUtil.removeExtension(request.query.id)),
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
function file(route, functionToExecute) {
    globals.app.get(route, function (request, response) {
        const subDir = new URL(request.headers.referer).pathname;
        const fileName = request.query.id;

        let filePath = fileUtil.urlDecode(globals.shared + subDir + '/' + fileName);
        if (request.query.dir) { filePath = filePath.replace('streamDirect', request.query.dir) }

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
function sendFile(route, view) {
    globals.app.get(route, function (request, response) {
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

/**
 * Search database for content and renders view
 * Looks at request.query.t to find table
 */
function search(search) {
    let searchResponse;
    let table;
    globals.app.get(search, function (request, response) {
        table = request.query.t ?? 'empty'; //TODO - empty search param - show seach page (TOBE Created)
        searchResponse = response;
        database.search(table, handleResult);
    }); 

    function handleResult(result){
        if(result) {
            console.log(result);
            contentLoader.renderView(searchResponse, 'files', 'Search: ' + table, '/search', 'search', false, result, '/');
        } else {
            //TODO - Create better error page
            errors.errorPage(searchResponse, 'Search of database resulted in error', '404', 'Not found', 'search');
        }
    }
}

//TODO - Scan files, look up files in database, add in database if found not already in it
//TODO - Error handling for wrong filename/structure
function scanFiles() {
    globals.app.get('/scan', function (request, response) {
        //Access file reader
            //Got list of files
        //Query database for files
        //Update files not in database
    });
}


//TODO - What is the purpose of this call?
/**
 * POST call to receive a request
 * 
 * Data should be sent in request.body in JSON format
 * @param {string} route Route to register
 */
function receive(route) {
    globals.app.post('/request', (req, res) => {
        const body = req.body;

        const requestDTO = body;
        console.log(requestDTO.movie);
        console.log(requestDTO.genre);
        console.log(database)

        database.collection("customers").insertOne(requestDTO, function (err, res) {
            if (err) { console.log('Shit hit the fan!'); }
            console.log("Everything good - Inserted: " + requestDTO);
            db.close();
        });


        res.end('Received: ' + res.statusCode + '\n');
    })
}