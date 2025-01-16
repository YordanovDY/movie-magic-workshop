import { Router } from "express";
import movies from "../movies.js";

const homeController = Router();

homeController.get('/', (req, res) => {
    res.render('home', { movies });
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController;