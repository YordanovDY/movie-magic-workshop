import { Router } from "express";
import movieService from '../services/movie-service.js';
import castService from "../services/cast-service.js";
import viewDataUtil from "../utils/view-data-util.js";
import { isAuthenticated } from "../middlewares/auth-middleware.js";
import { getErrorMessage } from "../utils/error-utils.js";

const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    let movies = null;
    try {
        movies = await movieService.getMovies(filter);

    } catch (err) {
        const errorMsg = getErrorMessage(err);
        res.setError(errorMsg);
        return res.redirect('/404');
    }

    res.render('movie/search', { movies, filter });
})

movieController.get('/create', isAuthenticated, (req, res) => {
    res.render('movie/create');
});

movieController.post('/create', isAuthenticated, async (req, res) => {
    const newMovie = req.body;
    const creatorId = req.user.id;

    try {
        await movieService.saveMovie(newMovie, creatorId);

    } catch (err) {
        const errorMsg = getErrorMessage(err);
        const categories = viewDataUtil.getCategoriesViewData(newMovie.category);
        return res.render('movie/create', { error: errorMsg, movie: newMovie, categories });
    }

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;

    let movie = null;
    try {
        // OPTION: Change to getMovieWithCasts if you prefer base casts presenting.
        movie = await movieService.getMovieWithExtCasts(movieId);
        const user = req.user;
        const isCreator = movieService.isCreator(movie, user);
        res.render('movie/details', { movie, isCreator });

    } catch (err) {
        res.setError('There is no such movie!');
        return res.redirect('/404');
    }

});

movieController.get('/:movieId/edit', isAuthenticated, async (req, res) => {
    const movieId = req.params.movieId;

    let movie = null;
    try {
        movie = await movieService.getSingleMovie(movieId);

    } catch (err) {
        res.setError('There is no such movie!');
        return res.redirect('/404');
    }


    const user = req.user;

    const isCreator = movieService.isCreator(movie, user);

    if (!isCreator) {
        res.setError('Only the creator of the movie can make changes!')
        return res.redirect('/404');
    }

    const categories = viewDataUtil.getCategoriesViewData(movie.category);

    res.render('movie/edit', { movie, categories });
});

movieController.post('/:movieId/edit', isAuthenticated, async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    let movie = null;
    try {
        movie = await movieService.getSingleMovie(movieId);

    } catch (err) {
        res.setError('There is no such movie!');
        return res.redirect('/404');
    }

    const user = req.user;

    const isCreator = movieService.isCreator(movie, user);

    if (!isCreator) {
        return res.redirect('/404');
    }

    try {
        await movieService.updateMovie(movieId, movieData);

    } catch (err) {
        const errorMsg = getErrorMessage(err);
        const categories = viewDataUtil.getCategoriesViewData(movie.category);
        return res.render('movie/edit', { movie, error: errorMsg, categories });
    }

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', isAuthenticated, async (req, res) => {
    const movieId = req.params.movieId;

    let movie = null;
    try {
        movie = await movieService.getSingleMovie(movieId);

    } catch (err) {
        res.setError('There is no such movie!');
        return res.redirect('/404');
    }

    const user = req.user;

    const isCreator = movieService.isCreator(movie, user);

    if (!isCreator) {
        res.setError('Only the creator can delete the movie!');
        return res.redirect('/404');
    }

    try {
        await movieService.deleteMovie(movieId);

    } catch (err) {
        const errorMsg = getErrorMessage(err);
        res.setError(errorMsg);
        return res.redirect('/404');
    }

    res.redirect('/');
});

movieController.get('/:movieId/attach-cast', isAuthenticated, async (req, res) => {
    const movieId = req.params.movieId;

    try {
        const movie = await movieService.getSingleMovie(movieId);
        const casts = await castService.getCasts({ exclude: movie.casts });

        const user = req.user;
        const isCreator = movieService.isCreator(movie, user);

        if (!isCreator) {
            res.setError('Only the creator of the movie can attach-casts!');
            return res.redirect('/404');
        }

        res.render('movie/attach-cast', { movie, casts });

    } catch (err) {
        const errorMsg = getErrorMessage(err);
        res.setError(errorMsg);
        res.redirect('/404');
    }
});

movieController.post('/:movieId/attach-cast', isAuthenticated, (req, res) => {
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
        .catch((err) => {
            const errorMsg = getErrorMessage(err);
            res.setError(errorMsg);
            res.redirect('/404');
        });
});

export default movieController;