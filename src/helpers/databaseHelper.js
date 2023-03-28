const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

/**
 * Values mathes property
 */
const TABLES = {
    configs: 'configs',
    movies: 'movies',
    tags: 'tags',
    genre: 'genre',
    // actors: 'actors',
    // music: 'music',
    // tvshows: 'tvshows',
    // books: 'books',
    // games: 'games',
    // pictures: 'pictures',
    // other: 'other'
}

const VALUES = {
    configs: 'setupdone',
    movies: 'title, year, location, genre',
    tags: 'title',
    genre: 'title',
    // actors: 'actor, movie'
    // music: 'title, year, album, artist, location',
    // tvshows: 'title, year, season, episode, location',
    // books: 'title, year, author, location',
    // games: 'title, year, author, location',
    // pictures: 'title',
    // other: 'title'
}

function valuesLength(table) {
    var valuesArr = VALUES[table].split(',');
    for (let index = 0; index < valuesArr.length; index++) {
        valuesArr[index] = '?';
    }
    return valuesArr.join();
}

const INSERTQUARIES = {
    configs: `INSERT INTO ${TABLES.configs} (${VALUES.configs}) VALUES (${valuesLength(TABLES.configs)})`,
    movies: `INSERT INTO ${TABLES.movies} (${VALUES.movies}) VALUES (${valuesLength(TABLES.movies)})`,
    tags: `INSERT INTO ${TABLES.tags} (${VALUES.tags}) VALUES (${valuesLength(TABLES.tags)})`,
    genre: `INSERT INTO ${TABLES.genre} (${VALUES.genre}) VALUES (${valuesLength(TABLES.genre)})`,
    // actors: `INSERT INTO ${TABLES.actors} (${VALUES.actors}) VALUES (${valuesLength(TABLES.actors)})`,
    // music: `INSERT INTO ${TABLES.music} (${VALUES.music}) VALUES (${valuesLength(TABLES.music)})`,
    // tvshows: `INSERT INTO ${TABLES.tvshows} (${VALUES.tvshows}) VALUES (${valuesLength(TABLES.tvshows)})`,
    // books: `INSERT INTO ${TABLES.books} (${VALUES.books}) VALUES (${valuesLength(TABLES.books)})`,
    // games: `INSERT INTO ${TABLES.games} (${VALUES.games}) VALUES (${valuesLength(TABLES.games)})`,
    // pictures: `INSERT INTO ${TABLES.pictures} (${VALUES.pictures}) VALUES (${valuesLength(TABLES.pictures)})`,
    // other: `INSERT INTO ${TABLES.other} (${VALUES.other}) VALUES (${valuesLength(TABLES.other)})`
}

let database;

module.exports = {
    init: initDB,
    getContent: getContent,
    addToTable: insertIntoDatabase,
    values: VALUES,
    tables: TABLES,
    ready: databaseReady
}

function databaseReady(callback, retries, wait = 1500) {
    if(!database) {
        if(retries == 5) {
            console.log('Waited for database too long.. abandoning..')
            return false;
        } else {
            setTimeout(databaseReady, wait, callback, retries++, wait);
        }
    } else {
        return true;
    }
}

//TODO - Popularity - each view increases by 1, ORDER BY popularity
//TODO - Pagination - LIMIT <fixed-amount>, <offset-startindex
//TODO - make actual search, lookup from different tables and display results

//TODO - rename to what it actually does - get entries from database - not search
function getContent(table, id = false) {
    let searchQuery;
    const catQuery = `SELECT * FROM ${table}`; //TODO - match with tag
    const contentQuery = `SELECT * FROM ${table} WHERE id = ${id} LIMIT 1`;

    searchQuery = id ? contentQuery : catQuery;
    console.log(table)
    console.log(id)
    console.log(searchQuery)
    return new Promise(function (resolve, reject) {
        console.log({db: database})
        database.all(searchQuery, function (err, result) {
            console.log(err)
            console.log(result)
            if (err) {
                console.log('Error while searching database: ' + err + ' - query: ' + catQuery)
                reject();
            } else if (result.length) {
                console.log('result from db')
                console.log(result)
                resolve(result);
            } else {
                console.log('ehhhhh????')
            }
        })
    });

    //TODO - Add better error handling
}

//TODO - scan database for entry
function scanForEntry(entry, table) {
    return false; //Entry does not exist
    return true; //Entry does exist
}

//TODO - clear all tables / delete database file - can be manually done also
function resetDatabase() {

}

//TODO - fix doc below
/**
 * Below we have the values in each table
 * Send values as array
 * 
 * configs - setupdone
 * 
 * movies - title, year
 * 
 * music - title, year, album, artist
 * 
 * tvshows - title, year, season, episode
 * 
 * books - title, year author
 * 
 * games - title, year, author
 * 
 * tags - title
 * 
 * other - title
 * @param {String} table Table to use - Check out TABLES global value
 * @param {Array} values Array of values - Check docs here for amount of values
 * @param {function} returnToSender Callback to handle result
 */
function insertIntoDatabase(table, values) {
    const query = INSERTQUARIES[table];
    // console.log(query)
    // console.log(values)
    return new Promise(function (resolve, reject) {
        database.run(query, values, function (err) {
            if (err) {
                if(err.errno == 19 && err.code == 'SQLITE_CONSTRAINT') {
                    console.log({
                        msg: 'Constraint hit - Likely already exists', 
                        table: table, 
                        values: values
                    });
                } else {
                    console.log({
                        msg: 'Error when inserting data in the database', 
                        query: query,
                        table: table, 
                        values: values,
                        error: err
                    });
                    reject();
                }
            } else {
                resolve()
            }
        });
    });
}

function initDB(callback){
    const db = new sqlite3.Database("./filesharer.sqlite3", (err) => {
        if (err) {
            console.log('Error when creating the database: ', err)
        } else {
            setupDatabase(callback);
        }
    })
    database = db;
}

function setupDatabase(callback) {
    createTables();

    function createTables() {
        database.run(`CREATE TABLE IF NOT EXISTS ${TABLES.configs} (setupdone INTEGER)`);
        database.run(`CREATE TABLE IF NOT EXISTS ${TABLES.movies} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, year TEXT, location TEXT, genre TEXT)`);
        database.run(`CREATE TABLE IF NOT EXISTS ${TABLES.tags} (title TEXT, UNIQUE(title))`);
        database.run(`CREATE TABLE IF NOT EXISTS ${TABLES.genre} (title TEXT, UNIQUE(title))`, checkConfig);
        // database.run(`CREATE TABLE IF NOT EXISTS ${TABLES.actors} (actor TEXT, movie INTEGER ,UNIQUE(actor))`);
        // database.run(`CREATE TABLE IF NOT EXISTS ${TABLES.music} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, year TEXT, album TEXT, artist TEXT, location TEXT)`);
        // database.run(`CREATE TABLE IF NOT EXISTS ${TABLES.tvshows} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, year TEXT, season TEXT, episode TEXT, location TEXT)`);
        // database.run(`CREATE TABLE IF NOT EXISTS ${TABLES.books} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, year TEXT, author TEXT, location TEXT)`);
        // database.run(`CREATE TABLE IF NOT EXISTS ${TABLES.games} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, year TEXT, author TEXT, location TEXT)`);
        // database.run(`CREATE TABLE IF NOT EXISTS ${TABLES.other} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, location TEXT)`);
        // database.run(`CREATE TABLE IF NOT EXISTS ${TABLES.pictures} (title TEXT, UNIQUE(title))`);
    }

    function checkConfig() {
        database.get(`SELECT * FROM ${TABLES.configs}`, (err, config) => {
            if (err) {
                return console.log('Error while checking config table: ' + err)
            }
            if (config == undefined) {
                console.log('config is undefined')
                insertCommonTags();
            } else {
                console.log('Database already created');
                console.log({cb: callback})
                if(callback) { callback(); }
            }
        });
    }

    function insertCommonTags() {
        database.run(INSERTQUARIES.tags, ['action']);
        database.run(INSERTQUARIES.tags, ['romance']);
        database.run(INSERTQUARIES.tags, ['fantasy']);
        database.run(INSERTQUARIES.tags, ['musical']);
        database.run(INSERTQUARIES.tags, ['comedy']);
        database.run(INSERTQUARIES.tags, ['teen']);
        database.run(INSERTQUARIES.tags, ['school']);
        database.run(INSERTQUARIES.tags, ['war']);
        database.run(INSERTQUARIES.tags, ['futuristic']);
        database.run(INSERTQUARIES.tags, ['medieval']);
        database.run(INSERTQUARIES.tags, ['animation']);
        database.run(INSERTQUARIES.tags, ['sport'], setupDone);
    }

    //TODO - Make file scanner and auto fill database
    function insertDummyMovies() {
        // database.run(INSERTQUARIES.movies, ['Moana', 2016, "/home/mio/sharedFiles/movies/Comedy/Attention.mp4"]);
        // database.run(INSERTQUARIES.movies, ['Beauty and the Beast', 1991, "/home/mio/sharedFiles/movies/Comedy/Maleficent.mp4"], setupDone);
        setupDone();
    }

    function setupDone() {
        database.run(INSERTQUARIES.configs, [1]);
        if(callback) { callback(); }
    }
}
