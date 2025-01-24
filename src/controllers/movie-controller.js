import { Router } from "express";
import movieService from '../services/movie-service.js';
import castService from "../services/cast-service.js";

const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    const movies = await movieService.getMovies(filter);

    res.render('movie/search', { movies, filter });
})

movieController.get('/create', (req, res) => {
    res.render('movie/create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;

    await movieService.saveMovie(newMovie);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieWithCasts(movieId);

    if (movieService.isFound(movie)) {
        res.render('movie/details', { movie });
        return;
    }

    res.redirect('/404');
});

movieController.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getSingleMovie(movieId);
    const casts = await castService.getCasts({ exclude: movie.casts });

    if (movieService.isFound(movie)) {
        res.render('movie/attach-cast', { movie, casts });
        return;
    }

    res.redirect('/404');
});

movieController.post('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});

export default movieController;