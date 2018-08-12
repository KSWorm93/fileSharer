module.exports = function (app) {
    
    /**
     * Routes
     */   
    app.get("/games/genre/strategy", function (request, response) {
        response.render('files', {title: 'Strategy'})
    });
}