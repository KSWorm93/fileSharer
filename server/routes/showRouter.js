module.exports = function (app) {
    
    /**
     * Routes
     */   
    app.get("/shows/genre/action", function (request, response) {
        response.render('files', {title: 'Action'})
    });
}