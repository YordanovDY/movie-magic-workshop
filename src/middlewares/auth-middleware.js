import jwt from 'jsonwebtoken';
import { getErrorMessage } from '../utils/error-utils.js'
import 'dotenv/config';

const { JWT_SECRET } = process.env;

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const tokenData = jwt.verify(token, JWT_SECRET);

        req.user = tokenData;
        res.locals.user = tokenData;

        next();

    } catch (err) {
        res.clearCookie('auth');
        const errorMsg = getErrorMessage(err);
        res.setError(errorMsg);
        res.redirect('/auth/login');
    }
}

export const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        res.setError('You must be authenticated!');
        return res.redirect('/auth/login');
    }

    next();
}

export const isNotAuthenticated = (req, res, next) => {
    if (req.user) {
        res.setError('You are already authenticated!');
        return res.redirect('/');
    }

    next();
}