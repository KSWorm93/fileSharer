
module.exports = function (app) {   
    //Dynamic content
    app.get('/search:text', function (request, response) {
        console.log(request.params.id)
    });
    
    
}