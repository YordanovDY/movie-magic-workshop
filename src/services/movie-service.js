import { v4 as generateId } from 'uuid';
import Movie from '../models/Movie.js';
// import movies from "../movies.js";

const movieService = {
    getMovies,
    getSingleMovie,
    saveMovie,
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

async function getSingleMovie(movieId) {
    return await Movie.findById(movieId);
}

function saveMovie(movieObj) {
    const id = generateId();
    const movie = {
        id,
        ...movieObj,
        rating: Number(movieObj.rating),
        year: Number(movieObj.year),
    }

    movies.push(movie);
}

function isFound(movieObj) {
    if (!movieObj) {
        return false;
    }

    return Object.keys(movieObj).length > 0 ? true : false;
}

export default movieService;