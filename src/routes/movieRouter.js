const routeHelper = require('../helpers/routeHelper.js');

module.exports = function () {
    routeHelper.addRoute('movies', '/movies/comedy', 'Comedy', true)
}