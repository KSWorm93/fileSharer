const routeHelper = require('../helpers/routeHelper.js');

module.exports = function () {
    routeHelper.addRoute('pictures', '/pictures/linux', 'Linux', true)
    routeHelper.addRoute('pictures' ,'/pictures/wallpapers', 'Wallpapers', true);
}