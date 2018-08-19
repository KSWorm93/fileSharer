const routeHelper = require('../helpers/routeHelper.js');

module.exports = function () {
    routeHelper.contentRoute('pictures', '/pictures/linux', 'Linux', true)
    routeHelper.contentRoute('pictures' ,'/pictures/wallpapers', 'Wallpapers', true);
}