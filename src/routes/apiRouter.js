var viewLoader = require('../helpers/viewLoader');
var getFile = require('../helpers/contentLoader').getFOF;
var stream = require('../helpers/streamingHelper').stream;



//TODO
//Refactor endpoints into API calls
//Call API or util method (create this?) in other routes
//Should be APP friendly for future

module.exports = function (app) {
	//Render the content view
	app.get('/api/content/:type/', function (request, response) {
		console.log('content - type')
		viewLoader.renderContent(response, 'categories', request.params.type);
	});

	//Render the content view
	app.get('/api/content/:type/:sub', function (request, response) {
		console.log('content - type:sub')
		//TODO 	- lowercase request params
		//		- remove unfriendly characters / encode/decode params
		//		- only use known formats and id to avoid encode issues
		viewLoader.renderContent(response, 'content', request.params.type, request.params.sub);

	});

	//Render the stream view
	app.get('/api/stream/:type/:id', function (request, response) {
		console.log('stream - type:id')
		console.log(request.params.type)
		console.log(request.params.id)
		viewLoader.renderStream(response, 'stream', request.params.type, request.params.id);
	});

	//Play the content
	app.get('/api/play/:type/:id', function (request, response) {
		console.log('Streaming - ' + request.params.id)
		stream(response, request);
		//TODO 	- call streamHelper / streamer(rename?)
		//		- with id, which will in turn call db
		//		- and look up the static file path
		//		- which will be streamed by the streamHelper
	})

	//Download the content
	app.get('/api/download/:type/:id', function (request, response) {
		console.log('download - type:id')
		//var fileContent = getFile(request.params.type, request.params.id);
		console.log('content')
		console.log(fileContent)
		//TODO 	- call downloadHelper / downloader(rename?)
		//		- with id, which will in turn call db
		//		- and look up the static file path
		//		- which will be downloaded by the downloadHelper 

	});
}