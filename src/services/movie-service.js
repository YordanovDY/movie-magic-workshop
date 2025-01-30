import Movie from '../models/Movie.js';

const movieService = {
    getMovies,
    getMovieWithCasts,
    getMovieWithExtCasts,
    getSingleMovie,
    saveMovie,
    attachCast,
    attachExtCast,
    isFound
}

function getMovies(filter = {}) {
    let query = Movie.find();

    if (filter.title) {
        query = query.find({
            title: {
                $regex: filter.title,
                $options: 'i'
            }
        });
    }

    if (filter.genre) {
        query = query.find({
            genre: {
                $regex: filter.genre,
                $options: 'i'
            }
        });
    }

    if (filter.year) {
        query = query.find({ year: Number(filter.year) });
    }

    return query;
}

function getMovieWithCasts(movieId) {
    return Movie.findById(movieId).populate('casts');
}

function getMovieWithExtCasts(movieId) {
    return Movie.findById(movieId).populate('extCasts.cast');
}

function getSingleMovie(movieId) {
    return Movie.findById(movieId);
}

function saveMovie(movieObj, creatorId) {
    const movie = {
        ...movieObj,
        rating: Number(movieObj.rating),
        year: Number(movieObj.year),
        creator: creatorId
    }

    return Movie.create(movie);
}

function attachCast(movieId, castId) {
    return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
}

function attachExtCast(movieId, castId, character) {
    return Movie.findByIdAndUpdate(movieId, {
        $push: {
            extCasts: {
                cast: castId,
                character
            }
        }
    });
}

function isFound(movieObj) {
    if (!movieObj) {
        return false;
    }

    return Object.keys(movieObj).length > 0 ? true : false;
}

export default movieService;