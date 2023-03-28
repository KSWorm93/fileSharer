module.exports = function (app) {

    //Include other routers
    require("./src/routes/staticRouter.js")(app);
    require("./src/routes/contentRouter.js")(app);
    require("./src/routes/searchRouter.js")(app);
    
}