import { Router } from "express";

const authController = Router();

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

export default authController;