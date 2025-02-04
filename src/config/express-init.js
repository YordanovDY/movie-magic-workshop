import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import 'dotenv/config';

const {SESSION_SECRET} = process.env;

export default function expressInit(app) {
    app.use('/static', express.static('./src/public'));

    app.use(express.urlencoded({ extended: false }));

    app.use(cookieParser());

    app.use(expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
    }));
}