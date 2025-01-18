import { Router } from "express";
import movieService from '../services/movie-service.js';

const movieController = Router();

movieController.get('/search', (req, res) => {
    const movies = movieService.getMovies();

    res.render('search', { movies });
})

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    const newMovie = req.body;

    movieService.saveMovie(newMovie);

    res.redirect('/');
});

movieController.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieService.getSingleMovie(movieId);

    if (movieService.isFound(movie)) {
        res.render('details', { movie });
        return;
    }

    res.redirect('/404');
})

export default movieController;