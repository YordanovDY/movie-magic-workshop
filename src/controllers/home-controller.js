import { Router } from "express";
import moviesService from '../services/movie-service.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const movies = await moviesService.getMovies();

    res.render('home', { movies });
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController;