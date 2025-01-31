import jwt from 'jsonwebtoken';
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
        res.redirect('/auth/login');
    }
}

export const isAuthenticated = (req, res, next) => {
    if(!req.user){
        return res.redirect('/auth/login');
    }

    next();
}

export const isNotAuthenticated = (req, res, next) => {
    if(req.user){
        return res.redirect('/');
    }

    next();
}