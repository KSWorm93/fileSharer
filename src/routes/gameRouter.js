const routeHelper = require('../helpers/routeHelper.js');

module.exports = function () {
    routeHelper.addRoute('games', 'games/strategy', 'Strategy', true)
}