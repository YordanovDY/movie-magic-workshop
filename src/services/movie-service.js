import Movie from '../models/Movie.js';

const movieService = {
    getMovies,
    getMovieWithCasts,
    getMovieWithExtCasts,
    getSingleMovie,
    saveMovie,
    updateMovie,
    deleteMovie,
    attachCast,
    attachExtCast,
    isFound,
    isCreator
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

function updateMovie(movieId, newMovieData) {
    return Movie.findByIdAndUpdate(movieId, newMovieData, {runValidators: true});
}

function deleteMovie(movieId) {
    return Movie.findByIdAndDelete(movieId);
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

function isCreator(movie, user) {
    if(!movie || !user){
        return false;
    }

    if(!movie.creator){
        return false;
    }

    return movie.creator.toString() === user.id;
}

export default movieService;