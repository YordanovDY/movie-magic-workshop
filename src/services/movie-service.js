import Movie from '../models/Movie.js';

const movieService = {
    getMovies,
    getSingleMovie,
    saveMovie,
    attachCast,
    isFound
}

function getMovies(filter = {}) {
    let query = Movie.find();

    if (filter.title) {
        // TODO: case insensitive and partial search
        query = query.find({ title: filter.title });
    }

    if (filter.genre) {
        // TODO: case insensitive search
        query = query.find({ genre: filter.genre });
    }

    if (filter.year) {
        query = query.find({ year: Number(filter.year) });
    }

    return query;
}

function getSingleMovie(movieId) {
    return Movie.findById(movieId);
}

function saveMovie(movieObj) {
    const movie = {
        ...movieObj,
        rating: Number(movieObj.rating),
        year: Number(movieObj.year),
    }

    return Movie.create(movie);
}

function attachCast(movieId, castId) {
    return Movie.findByIdAndUpdate(movieId, {$push: {casts: castId}});
}

function isFound(movieObj) {
    if (!movieObj) {
        return false;
    }

    return Object.keys(movieObj).length > 0 ? true : false;
}

export default movieService;