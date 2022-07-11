const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!")
        console.log(err)
    })

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

const Movie = mongoose.model('Movie', movieSchema)

// const amadeus = new Movie({title: 'Amadeus', year: 1986, score: 9.2, rating: 'R'})

// Movie.insertMany([
//     {title: 'Amadeus', year: 1986, score: 9.2, rating: 'R'},
//     {title: 'Alien', year: 1979, score: 8.1, rating: 'R'},
//     {title: 'Phim', year: 1983, score: 9.1, rating: 'PG'}
// ])