var genres_movies = require('../content/genres_movies');
const database = require('../helpers/databaseHelper.js');
const Promise = require('bluebird');

module.exports = {
    movies: {
        title: 'Movies',
        returnText: 'Home',
        returnRoute: 'home',
        self: 'movies',
        genres: genres
    },
    music: {
        title: 'Music'
    }
}

//TODO - run at startup? run each call ? fix it

var genres = getGenres();
function getGenres() {
    if(database.ready()) {
        console.log('getRenres')
        return new Promise (function (resolve) {
            database.getContent('genre').then(function(result) {
                resolve(result);
            });
        })
    }
}

//TODO - add locales