const routeHelper = require('../helpers/routeHelper.js');

module.exports = function () {
    routeHelper.contentRoute('music', '/music/katy%20perry', 'Katy Perry', true)
    routeHelper.contentRoute('music' ,'/music/rihanna', 'Rihanna', true);
}