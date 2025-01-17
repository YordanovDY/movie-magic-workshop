import { Router } from "express";
import movieService from '../services/movie-service.js';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieService.getSingleMovie(movieId);
    
    res.render('details', { movie });
})

export default movieController;