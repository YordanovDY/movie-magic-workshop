import { Router } from "express";
import movieService from '../services/movie-service.js';

const movieController = Router();

movieController.get('/search', (req, res) => {
    const filter = req.query;

    const movies = movieService.getMovies(filter);

    res.render('search', { movies, filter });
})

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    const newMovie = req.body;

    movieService.saveMovie(newMovie);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getSingleMovie(movieId);

    if (movieService.isFound(movie)) {
        res.render('details', { movie });
        return;
    }

    res.redirect('/404');
})

export default movieController;