// imported modules/packages
const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');

const app = express();

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })

// middleware functions used
app.use(morgan('common')); //logger for console
app.use(morgan('combined', { stream: accessLogStream })); //logger for log.txt file
app.use(express.static('public')); //serving static files

// top ten movies data
let topTenMovies = [
    {
        title: 'The Dark Knight',
        director: 'Christopher Nolan'
    },

    {
        title: 'Inception',
        director: 'Christopher Nolan'
    },

    {
        title: 'Interstellar',
        director: 'Christopher Nolan'
    },

    {
        title: 'Spirited Away',
        director: 'Hayao Miyazaki'
    },

    {
        title: 'Parasite',
        director: 'Bong Joon Ho'
    },

    {
        title: 'WALL·E',
        director: 'Andrew Stanton'
    },

    {
        title: 'Spider-Man: Into the Spider-Verse',
        director: 'Bob Persichetti'
    },

    {
        title: 'Princess Mononoke',
        director: 'Hayao Miyazaki'
    },

    {
        title: 'Your Name.',
        director: 'Makoto Shinkai'
    },

    {
        title: 'Shutter Island',
        director: 'Martin Scorsese'
    },

];

// GET requests
app.get('/movies', (req, res) => {
    res.json(topTenMovies);
});

app.get('/', (req, res) => {
    res.send('Hello, welcome to the myFlix API!')
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