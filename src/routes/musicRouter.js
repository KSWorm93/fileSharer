const routeHelper = require('../helpers/routeHelper.js');

module.exports = function () {
    routeHelper.addRoute('music', '/music/katy%20perry', 'Katy Perry', true)
    routeHelper.addRoute('music' ,'/music/rihanna', 'Rihanna', true);
}