const download = require('../helpers/downloadHelper.js');
const streamer = require('../helpers/streamingHelper.js')
const routeHelper = require('../helpers/routeHelper.js')

module.exports = function () {
    //Static
    routeHelper.sendFileRoute('/', 'index.html');
    
    //Redirects
    routeHelper.redirectRoute('/home', '/');
    
    //Files
    routeHelper.fileRoute('/download', download.downloadFile);
    routeHelper.fileRoute('/stream', streamer.streamFile);
    routeHelper.streamRoute('/streamDirect');
    
    //Search
    routeHelper.searchRoute('/search');
    routeHelper.searchRoute('/find');
    
    //???
    routeHelper.recieveRoute('/request');
}