import { Router } from "express";
import moviesService from '../services/movie-service.js';

const homeController = Router();

homeController.get('/', (req, res) => {
    const movies = moviesService.getMovies();

    res.render('home', { movies });
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController;