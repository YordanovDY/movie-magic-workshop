import { Router } from "express";
import userService from "../services/auth-service.js";

const authController = Router();

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);

        res.cookie('auth', token, {
            maxAge: 2 * 60 * 60 * 1000, // 2h in milliseconds
            httpOnly: true
        });

        res.redirect('/');

    } catch (err) {
        res.redirect('/404');
    }

});

authController.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
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