//Imports
const express = require('express');
const hbs = require("hbs");

//Constants
const app = express();
const sharedDir = __dirname + '/files';
const publicDir = __dirname + '/public/app/';
const PORT = 4090;
const HOSTNAME = 'http://localhost:'

//Export globals
module.exports = {
    app: app,
    shared: sharedDir,
    public: publicDir
}

//Set engine and views location
app.set('views', publicDir + 'views/')
app.use(express.static(publicDir + 'scripts'))
app.set('view engine', 'html');
app.engine('html', hbs.__express);

//Add routes
//Param 1: app instance
//Param 2: publicDir
//Param 3: sharedDir
const main = require("./src/routes/mainRouter.js")();
const books = require("./src/routes/bookRouter.js")();
const movies = require("./src/routes/movieRouter.js")();
const music = require("./src/routes/musicRouter.js")();
const games = require("./src/routes/gameRouter.js")();
const shows = require("./src/routes/showRouter.js")();
const pictures = require("./src/routes/pictureRouter.js")();

//start the server
app.listen(PORT);

console.log("Server running at: " + HOSTNAME + PORT);