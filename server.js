//Imports
const dirs = require('./src/utilities/directories');
const express = require('express');
const hbs = require('hbs');

//Constants
const app = express();
//Server
const PORT = 4090;
const HOSTNAME = 'http://localhost:';

//TODO - Log steps taken during startup

//Set engine and views location
app.set('views', dirs.public + 'views/');
app.use(express.static(dirs.public))
app.set('view engine', 'html');
app.engine('html', hbs.__express);

//Add routes
// const main = require("./src/routes/mainRouter.js")();
// const routes = require("./src/routes/contentRouterOld.js")();
// require("./src/routes/staticRouter.js")(app);
// require("./src/routes/contentRouter.js")(app);
// require("./src/routes/searchRouter.js")(app);
require(".src/routes/router.js")(app);

//TODO - consider making the scanner do this
const db = require('./src/helpers/databaseHelper');
db.init();

//start the server
app.listen(PORT);

console.log("Server running at: " + HOSTNAME + PORT);