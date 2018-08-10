module.exports = function (app, dirName) {
    
    /**
     * Routes
     */   
    app.get("/shows/genre/action", function (request, response) {
        response.render('files', {title: 'Action'})
    });
}