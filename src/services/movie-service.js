import { v4 as generateId } from 'uuid';
import movies from "../movies.js";

const movieService = {
    getSingleMovie,
    saveMovie,
    isFound
}

function getSingleMovie(movieId) {
    return movies.find(m => m.id === movieId) || {};
}

function saveMovie(movieObj) {
    const id = generateId();
    const movie = {
        id,
        ...movieObj
    }

    movies.push(movie);
}

function isFound(movieObj) {
    return Object.keys(movieObj).length > 0 ? true : false;
}

export default movieService;