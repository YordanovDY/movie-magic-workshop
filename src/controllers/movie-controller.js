import { Router } from "express";
import movies from '../movies.js';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movies.find(m => m.id === movieId);
    console.log(movie);
    

    res.render('details', { movie });
})

export default movieController;