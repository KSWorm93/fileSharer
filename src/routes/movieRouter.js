const routeHelper = require('../helpers/routeHelper.js');

module.exports = function () {
    routeHelper.contentRoute('movies', '/movies/comedy', 'Comedy', true)
}