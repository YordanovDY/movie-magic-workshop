import movies from "../movies.js";

const movieService = {
    getSingleMovie,
    isFound
}

function getSingleMovie(movieId) {
    return movies.find(m => m.id === movieId) || {};
}

function isFound(movieObj) {
    return Object.keys(movieObj).length > 0 ? true : false;
}

export default movieService;