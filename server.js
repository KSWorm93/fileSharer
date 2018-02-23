/**
 * Imports
 */
const express = require("express");
const hbs = require("hbs");

/**
 * Variables
 */
let app = express();
let publicDir = __dirname + '/public/app/';
const PORT = 4090;

//Set engine and views location
app.set('view engine', 'html');
app.set('views', publicDir + 'views/')
app.use(express.static(publicDir + 'js'))
app.engine('html', require('hbs').__express);

//Add routes
//Param 1: app instance
//Param 2: publicDir - res.sendFile(publicDir + "fileName")
const main = require("./routes/mainRouter.js")(app, publicDir);
const books = require("./routes/bookRouter.js")(app, publicDir);
const moveis = require("./routes/movieRouter.js")(app, publicDir);
const games = require("./routes/gameRouter.js")(app, publicDir);

//start the server
app.listen(PORT);

console.log("Server running at: http://localhost:" + PORT);