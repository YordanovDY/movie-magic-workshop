import express from 'express';
import cookieParser from 'cookie-parser';

export default function expressInit(app) {
    app.use('/static', express.static('./src/public'));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
}