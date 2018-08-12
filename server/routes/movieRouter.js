const fileLoader = require('../helpers/fileLoadHelper.js')

module.exports = function (app) {
    app.get("/movies/comedy", function (request, response) {
        response.render('files',
            {
                title: 'Comedy',
                subPart: 'movies',
                path: 'iWillFail.png',
                files: data
            })
    });
}

const data = ['shes the man.mp4', 'its a boy girl thing.avi'];
