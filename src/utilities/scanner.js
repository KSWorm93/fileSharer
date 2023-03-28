const fs = require('fs');
const path = require('path');
const files = require('./fileUtilities.js');
const dirs = require('./directories');
const database = require('../helpers/databaseHelper');
const IGNORED = ['music'];

//TODO - cleanup - Some problems with file names, X.Men example
//TODO - refactor - use let/const - faster methods?
//TODO - check if database is created, else create it then proceed
//TODO - better logging in the scanner - verbose/debug only log

database.init(startScan);

function startScan(root = dirs.shared) {
    root = path.normalize(root);
    console.log('Scanning for files @ ' + root);
    walkDirectory(root);
}

function walkDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (file of files) {
        const filepath = path.join(dir, file);
        const stat = fs.statSync(filepath);

        if (stat.isDirectory()) {
            walkDirectory(filepath)
        } else {
            addFileToDB(file, filepath);
        }
    }
}

function addFileToDB(file, filepath) {
    if (ignoreDirectory(filepath)) { return; }
    var dbObjects = prepareInsert(file, filepath)

    if (!dbObjects) { return; }
    dbObjects.forEach(element => {
        //TODO - check if exist before trying to add - do db lookup before adding?
        database.addToTable(element.table, element.values).catch(function () {
            console.log({
                msg: 'Unexpexted error occured when attempting to insert data in database', 
                file: 'scanner.js',
                function: 'addFileToDB'
            }); 
        });
    });
}



function prepareInsert(file, filepath) {
    // var relativePath = filepath.replace(path.normalize(dirs.shared), '');
    // var table = relativePath.split(/[\/\\]+/)[0];
    var table = getTextAtIndex(filepath)
    var valuesFunc = getValuesFunction(table)
    var valuesResult = valuesFunc(file, filepath)
    // console.log({path: filepath})
    if (!valuesResult) { return; }

    var dbObjects = [];

    for (const key in valuesResult) {
        if (Object.hasOwnProperty.call(valuesResult, key)) {
            const values = valuesResult[key];
            dbObjects.push({
                table: key,
                values: values
            })
        }
    }

    return dbObjects;
}

function getTextAtIndex(filepath, index = 0) {
    var relativePath = filepath.replace(path.normalize(dirs.shared), '');
    var first = relativePath.split(/[\/\\]+/)[index];
    return first;
}

//Value functions
//TODO - different naming format?
function movies(file, filepath) {
    if (!checkFormat(file, 'mp4')) {
        //console.log(file + ' has invalid format at this point - Skipping');
        return;
    }
    
    var title = files.removeExtension(file).split(')')[1].trim();
    var year = between(filepath, '(', ')');
    var location = filepath;
    var genre = getTextAtIndex(filepath, 1);

    /**
     * Object { table: values }
     */
    var returnObj = {
        movies: [title, year, location, genre],
        genre: [genre] 
    }
    // console.log(returnObj)

    return returnObj;
}

// function music() {

// }

// function tvshows() {

// }

// function books() {

// }

// function games() {

// }

function pictures(file) {
    if (!checkFormat(file, 'png,jpg')) {
        //console.log(file + ' has invalid format at this point - Skipping');
        return;
    }
    return; //skipping currently
    return [file];
}

//Utils
//TODO - consider just placing the functions inside the object?
function getValuesFunction(table) {
    const functions = {
        movies: movies//,
        // music: 'music',
        // tvshows: 'tvshows',
        // books: 'books',
        // games: 'games',
        // pictures: pictures,
    }
    return functions[table];
}

function checkFormat(format, allowedFormats) {
    var extension = files.getFileExtension(format);
    return allowedFormats.includes(extension);
}

function between(str, first, second) {
    return str.substring(
        str.lastIndexOf(first) + 1,
        str.lastIndexOf(second)
    );
}

//Config to set IGNORED so easily changeable
function ignoreDirectory(filepath) {
    return IGNORED.includes(filepath);
}