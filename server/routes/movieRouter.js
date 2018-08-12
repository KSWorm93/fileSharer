module.exports = function (app) {
    app.get("/movies/comedy", function (request, response) {
        response.render('files',
            {
                title: 'Comedy',
                returnPath: 'movies',
                path: 'iWillFail.png',
                files: data
            })
    });
}

const data = ['shes the man.mp4', 'its a boy girl thing.avi'];
