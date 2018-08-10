module.exports = function (app, dirName) {
    
    /**
     * Routes
     */   
    app.get("/movies/genre/action", function (request, response) {
        response.render('files', {title: 'Action'})
    });
}