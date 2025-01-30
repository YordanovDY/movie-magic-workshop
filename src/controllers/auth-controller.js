import { Router } from "express";
import userService from "../services/auth-service.js";

const authController = Router();

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const { email, password, repassword } = req.body;

    try {
        await userService.register(email, password, repassword);
        res.redirect('/');

    } catch (err) {
        console.error(err.message);
        res.redirect('/404');
    }
});

export default authController;