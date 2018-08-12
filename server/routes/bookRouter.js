const routeHelper = require('../helpers/routeHelper.js');

module.exports = function () {
    routeHelper.addRoute('books', '/books/adventure', 'Adventure', true);
}