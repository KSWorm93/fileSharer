//Imports
const express = require('express');
const hbs = require("hbs");

//Constants
const app = express();
const sharedDir = __dirname + '/files';
const publicDir = __dirname + '/public/app/';
const sourceDir = __dirname + 'src';
const PORT = 4090;
const HOSTNAME = 'http://localhost:'

//Export globals
module.exports = {
    app: app,
    source: sourceDir,
    shared: sharedDir,
    public: publicDir
}

//Set engine and views location
app.set('views', publicDir + 'views/')
app.use(express.static(publicDir + 'scripts'))
app.set('view engine', 'html');
app.engine('html', hbs.__express);

//Add routes
const main = require("./src/routes/mainRouter.js")();
const routes = require("./src/routes/contentRouter.js")();

//start the server
app.listen(PORT);

console.log("Server running at: " + HOSTNAME + PORT);