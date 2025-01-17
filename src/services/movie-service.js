import movies from "../movies.js";

const movieService = {
    getSingleMovie
}

function getSingleMovie(movieId) {
    return movies.find(m => m.id === movieId) || {};
}

export default movieService;