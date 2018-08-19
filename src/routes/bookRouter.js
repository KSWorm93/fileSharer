const routeHelper = require('../helpers/routeHelper.js');

module.exports = function () {
    routeHelper.contentRoute('books', '/books/adventure', 'Adventure', true);
}