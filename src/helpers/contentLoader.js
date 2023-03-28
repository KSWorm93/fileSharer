const database = require('./databaseHelper.js');
const categories = require('../content/categories');
const Promise = require('bluebird');

module.exports = {
    getContent: getContent,
    getStream: getStream,
    getFOF: getFileOrFolder
}

/**
 * Database returns array of objects
 */
function getFileOrFolder(type, id = false) {
    return new Promise (function (resolve) {
        database.getContent(type, id).then(function(result) {
            resolve(result);
        });
    })   
}

function getStream(type, id) {
    console.log('hello from getStream')
    console.log(type)
    console.log(id)
    return new Promise(function (resolve) {
        var returnObj = false;
                
        getFileOrFolder(type, id).then(function(file) {
            returnObj = file[0];
            returnObj.type = type;
            returnObj.title = file.title;
            resolve(returnObj);
        })
        //TODO - error handling, if nothing found, return error
    })
}

function getContent(type, subType = false) {
    console.log('hello from content')
    console.log(type)
    console.log(subType)
    return new Promise(function (resolve) {
        var returnObj = false;
        if (subType) {
            returnObj = categories[type].genres.find(sub => sub.self == subType)
            
            getFileOrFolder(type).then(function(content) {
                returnObj.content = content;
                returnObj.type = type;
                resolve(returnObj);
            })
        } else {
            //TODO - fix logic in categories.js
            //TODO - we do not get genres from db
            
            // var test = new Promise (function (resolve) {
            //     database.getContent('genre').then(function(result) {
            //         resolve(result);
            //     });
            // })   

            returnObj = categories[type];
            // returnObj = test;
            returnObj.type = type;
            console.log(returnObj)
            resolve(returnObj);
        }

        //TODO - error handling, if nothing found, return error
    })
}