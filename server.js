// Imports
const express = require('express');
const hbs = require("hbs");


// Constants
const app = express();
const sharedDir = __dirname + '/shared/';
const publicDir = __dirname + '/public/app/';
const PORT = 4090;
const HOSTNAME = 'http://localhost:'

//Set engine and views location
app.set('views', publicDir + 'views/')
app.use(express.static(publicDir + 'scripts'))
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

//Add routes
//Param 1: app instance
//Param 2: publicDir - res.sendFile(publicDir + "fileName")
const main = require("./server/routes/mainRouter.js")(app, publicDir, sharedDir);
const books = require("./server/routes/bookRouter.js")(app, sharedDir);
const moveis = require("./server/routes/movieRouter.js")(app, publicDir);
const games = require("./server/routes/gameRouter.js")(app, publicDir);
const shows = require("./server/routes/showRouter.js")(app, publicDir);

//start the server
app.listen(PORT);

console.log("Server running at: " + HOSTNAME + ' ' + PORT);