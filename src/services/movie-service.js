import { v4 as generateId } from 'uuid';
import Movie from '../models/Movie.js';
// import movies from "../movies.js";

const movieService = {
    getMovies,
    getSingleMovie,
    saveMovie,
    isFound
}

async function getMovies(filter = {}) {
    let result = await Movie.find();

    // if(filter.title){
    //     result = result.filter(movie => movie.title.toLowerCase().includes(filter.title.toLowerCase()));
    // }

    // if(filter.genre) {
    //     result = result.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
    // }

    // if(filter.year) {
    //     result = result.filter(movie => movie.year === Number(filter.year));
    // }

    return result;
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
    if(!movieObj){
        return false;
    }

    return Object.keys(movieObj).length > 0 ? true : false;
}

export default movieService;