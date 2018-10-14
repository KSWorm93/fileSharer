const download = require('../helpers/downloadHelper.js');
const streamer = require('../helpers/streamingHelper.js')
const routeHelper = require('../helpers/routeHelper.js')

module.exports = function () {
    routeHelper.sendFileRoute('/', 'index.html');
    routeHelper.redirectRoute('/home', '/');
    routeHelper.streamRoute('/streamDirect');
    routeHelper.fileRoute('/download', download.downloadFile);
    routeHelper.fileRoute('/stream', streamer.streamFile);
}