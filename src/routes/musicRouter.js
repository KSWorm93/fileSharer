const routeHelper = require('../helpers/routeHelper.js');

module.exports = function () {
    routeHelper.contentRoute('music', '/music/katy%20perry', 'Katy Perry')
    routeHelper.contentRoute('music' ,'/music/rihanna', 'Rihanna', true);
    routeHelper.contentRoute('music' ,'/music/arianna%20grande', 'Arianna Grande');
}