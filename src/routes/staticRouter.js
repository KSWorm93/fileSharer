const path = require('path');
const dirs = require('../utilities/directories');

module.exports = function (app) {   
    app.get('/', function (request, response) {
		response.sendFile(path.resolve(dirs.public, 'index.html'));
    });

    app.get('/home', function (request, response) {
        response.redirect('/');
    });

    // app.get('/style/:sheet', function (request, response) {
	// 	console.log('getting style')
	// 	console.log(path.resolve(dirs.style, request.params.sheet))
    // 	response.sendFile(path.resolve(dirs.style, request.params.sheet));
    // })

    //TODO - catch all - usually error, or mistake on my part.. :D
    // app.get('*', function (request, response) {
    //     console.log('I done goofed.. ' + request.url)
    // })
}