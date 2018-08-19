const download = require('../helpers/downloadHelper.js');
const streamer = require('../helpers/streamingHelper.js')
const routeHelper = require('../helpers/routeHelper.js')

module.exports = function () {
    routeHelper.sendFileRoute('/', 'index.html');
    routeHelper.redirectRoute('/home', '/');
    routeHelper.contentRoute('home', '/books', 'Books');
    routeHelper.contentRoute('home', '/movies', 'Movies');
    routeHelper.contentRoute('home', '/music', 'Music');
    routeHelper.contentRoute('home', '/games', 'Games');
    routeHelper.contentRoute('home', '/shows', 'Shows');
    routeHelper.contentRoute('home', '/pictures', 'Pictures');
    routeHelper.streamRoute('/streamDirect');
    routeHelper.fileRoute('/download', download.downloadFile);
    routeHelper.fileRoute('/stream', streamer.streamFile);
}