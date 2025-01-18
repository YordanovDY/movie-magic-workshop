import { v4 as generateId } from 'uuid';
import movies from "../movies.js";

const movieService = {
    getMovies,
    getSingleMovie,
    saveMovie,
    isFound
}

function getMovies() {
    return movies;
}

function getSingleMovie(movieId) {
    return movies.find(m => m.id === movieId) || {};
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
    return Object.keys(movieObj).length > 0 ? true : false;
}

export default movieService;