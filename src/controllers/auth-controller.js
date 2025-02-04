import { Router } from "express";
import userService from "../services/auth-service.js";
import { isAuthenticated, isNotAuthenticated } from "../middlewares/auth-middleware.js";
import { getErrorMessage } from "../utils/error-utils.js";

const authController = Router();

authController.get('/login', isNotAuthenticated, (req, res) => {
    res.render('auth/login');
});

authController.post('/login', isNotAuthenticated, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);

        res.cookie('auth', token, {
            maxAge: 2 * 60 * 60 * 1000, // 2h in milliseconds
            httpOnly: true
        });

        res.redirect('/');

    } catch (err) {
        const errorMsg = getErrorMessage(err);
        res.render('auth/login', { error: errorMsg });
    }

});

authController.get('/register', isNotAuthenticated, (req, res) => {
    res.render('auth/register');
});

authController.post('/register', isNotAuthenticated, async (req, res) => {
    const { email, password, repassword } = req.body;

    try {
        await userService.register(email, password, repassword);
        res.redirect('/');

    } catch (err) {
        const errorMsg = getErrorMessage(err);
        res.render('auth/register', { error: errorMsg });
    }
});

authController.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
});

export default authController;