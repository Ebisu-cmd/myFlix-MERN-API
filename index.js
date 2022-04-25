// imported modules/packages
const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose'),
    Models = require('./models.js');

const app = express();

//import models for user and movie schema
const Movies = Models.Movie;
const Users = Models.User;

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })

// middleware functions used
app.use(morgan('common')); //logger for console
app.use(morgan('combined', { stream: accessLogStream })); //logger for log.txt file
app.use(express.static('public')); //serving static files
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true }); //connect to database

// API routing
app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) => { return movie.title === req.params.title }));
});

app.get('/movies/genres/:genrename', (req, res) => {
    res.send('A JSON object holding data about a genre');
});

app.get('/movies/directors/:name', (req, res) => {
    res.send('A JSON object holding data about a movie director');
});

app.post('/users', (req, res) => {
    res.send('A JSON object holding data about the user that was added, including an ID');
});

app.put('/users/:id', (req, res) => {
    res.send('A text message indicating whether the users information was successfully changed');
});

app.post('/users/:id/:movietitle', (req, res) => {
    res.send('A text message indicating whether the desired movie was added to the users list of favorites');
});

app.delete('/users/:id/:movietitle', (req, res) => {
    res.send('A text message indicating whether the desired movie was deleted in the users list of favorites');
});

app.delete('/users/:id', (req, res) => {
    res.send('A text message indicating that a user email has been removed');
});

app.get('/', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
})

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});