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
    const creatorId = req.user?.id;

    await movieService.saveMovie(newMovie, creatorId);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;

    // OPTION: Change to getMovieWithCasts if you prefer base casts presenting.
    const movie = await movieService.getMovieWithExtCasts(movieId);
    const user = req.user;

    const isCreator = movieService.isCreator(movie, user);

    if (movieService.isFound(movie)) {
        res.render('movie/details', { movie, isCreator});
        return;
    }

    res.redirect('/404');
});

movieController.get('/:movieId/delete', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getSingleMovie(movieId);
    const user = req.user;

    const isCreator = movieService.isCreator(movie, user);

    if(!isCreator) {
        return res.redirect('/404');
    }

    await movieService.deleteMovie(movieId);
    res.redirect('/');
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

movieController.post('/:movieId/attach-cast', (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    const character = req.body.character;

    const queries = [
        movieService.attachCast(movieId, castId),
        movieService.attachExtCast(movieId, castId, character)
    ];

    Promise.all(queries)
        .then(() => {
            res.redirect(`/movies/${movieId}/details`);
        })

});

export default movieController;