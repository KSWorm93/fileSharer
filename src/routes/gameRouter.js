const routeHelper = require('../helpers/routeHelper.js');

module.exports = function () {
    routeHelper.contentRoute('games', 'games/strategy', 'Strategy', true)
}