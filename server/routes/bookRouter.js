const fileLoader = require('../helpers/fileLoadHelper.js')

module.exports = function (app) {

    /**
     * Routes
     */
    app.get("/books/adventure", function (request, response) {
        response.render('files',
            {
                title: 'Adventure',
                subPart: 'books',
                path: 'iWillFail.png',
                files: data
            })
    });
}

const data = ['neofetch.png', 'lockscreen.png', 'lockscreen-original.png'];

//TODO - Implement loadFiledFromDrive
// const data = fileLoader.loadFilesFromDrive('someDir')