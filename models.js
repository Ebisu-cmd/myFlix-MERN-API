// import mongoose as the app's ODM for MongoDB
const mongoose = require('mongoose');

// define schemas for movie and user documents
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Director: {
        Name: String,
        Bio: String,
        Birthday: Date
    },
    Genre: {
        Name: String,
        Description: String
    },
    Actors: [String],
    ImageUrl: String,
    Featured: Boolean 
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

// create models from schemas
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

//export models
module.exports.Movie = Movie;
module.exports.User = User;