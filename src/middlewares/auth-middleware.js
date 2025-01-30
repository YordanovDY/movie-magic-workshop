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
        next();

    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}