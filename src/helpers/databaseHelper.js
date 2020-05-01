const sqlite3 = require('sqlite3');

const configsTable = 'configs';
const movieTable = 'movies';
const musicTable = 'songs';
const showsTable = 'shows';
const booksTable = 'books';
const gamesTable = 'games';
const tagsTable = 'tags';
const otherTable = 'other';

const tables = {
    config: configsTable,
    movies: movieTable,
    music: musicTable,
    tvshows: showsTable,
    books: booksTable,
    games: gamesTable,
    tags: tagsTable,
    other: otherTable
}

let globalDB;

module.exports = {
    db: globalDB,
    setup: setup,
    TABLES: tables,
    search: searchDatabase
}

function searchDatabase(table, returnToSender = false){
    const query = `SELECT * FROM ${table}`;

    globalDB.all(query, (err, result) => {
        if(err) {
            console.log('Error while searching database: ' + err + ' - query: ' + query)
            noResult();
        } else if (result.length) {
            returnToSender(result);
        } else {
            noResult();
        }
    });

    function noResult(query = false) {
        console.log('No result found');
        returnToSender(query);
    }
}


function setup() {
    const db = new sqlite3.Database("./filesharer.sqlite3", (err) => { 
        if (err) { 
            console.log('Error when creating the database: ', err) 
        } else { 
            setupDatabase()
        } 
    })
    globalDB = db;
    
    function setupDatabase() {
        createTables();

        function createTables() {
            globalDB.run(`CREATE TABLE IF NOT EXISTS ${tables.config} (setupdone INTEGER)`);
            globalDB.run(`CREATE TABLE IF NOT EXISTS ${tables.movies} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, year TEXT)`);
            globalDB.run(`CREATE TABLE IF NOT EXISTS ${tables.music} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, year TEXT, album TEXT, artist TEXT)`);
            globalDB.run(`CREATE TABLE IF NOT EXISTS ${tables.tvshows} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, year TEXT, season TEXT, chapter TEXT)`);
            globalDB.run(`CREATE TABLE IF NOT EXISTS ${tables.books} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, year TEXT, author TEXT)`);
            globalDB.run(`CREATE TABLE IF NOT EXISTS ${tables.games} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, year TEXT, author TEXT)`);
            globalDB.run(`CREATE TABLE IF NOT EXISTS ${tables.other} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)`);
            globalDB.run(`CREATE TABLE IF NOT EXISTS ${tables.tags} (title TEXT, UNIQUE(title))`, checkConfig);
        }
        
        function checkConfig() {
            globalDB.get(`SELECT * FROM ${tables.config}`, (err, config) => {
                if(err) {
                    return console.log('Error while checking config table: ' + err)
                }
                if(config == undefined) {
                    insertCommonTags()
                } else {
                    console.log('Database already created')
                }
            });

        }

        function insertCommonTags() {
            globalDB.run(`INSERT INTO ${tables.tags} (title) VALUES (?)`, ['action']);
            globalDB.run(`INSERT INTO ${tables.tags} (title) VALUES (?)`, ['romance']);
            globalDB.run(`INSERT INTO ${tables.tags} (title) VALUES (?)`, ['fantasy']);
            globalDB.run(`INSERT INTO ${tables.tags} (title) VALUES (?)`, ['musical']);
            globalDB.run(`INSERT INTO ${tables.tags} (title) VALUES (?)`, ['comedy']);
            globalDB.run(`INSERT INTO ${tables.tags} (title) VALUES (?)`, ['teen']);
            globalDB.run(`INSERT INTO ${tables.tags} (title) VALUES (?)`, ['school']);
            globalDB.run(`INSERT INTO ${tables.tags} (title) VALUES (?)`, ['war']);
            globalDB.run(`INSERT INTO ${tables.tags} (title) VALUES (?)`, ['futuristic']);
            globalDB.run(`INSERT INTO ${tables.tags} (title) VALUES (?)`, ['medieval']);
            globalDB.run(`INSERT INTO ${tables.tags} (title) VALUES (?)`, ['animation']);
            globalDB.run(`INSERT INTO ${tables.tags} (title) VALUES (?)`, ['sport'], setupDone);
        }
        
        function setupDone() {
            globalDB.run(`INSERT INTO ${tables.tags} (setupdone) VALUES (?)`, [1]);
        }
    }
}





