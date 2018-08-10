module.exports = function (app, dirName) {
    
    /**
     * Routes
     */   
    app.get("/games/genre/strategy", function (request, response) {
        response.render('files', {title: 'Strategy'})
    });
}