import { Router } from "express";
import castService from "../services/cast-service.js";
import { isAuthenticated } from "../middlewares/auth-middleware.js";
import { getErrorMessage } from "../utils/error-utils.js";

const castController = Router();

castController.use(isAuthenticated);

castController.get('/create', (req, res) => {
    res.render('cast/create');
});

castController.post('/create', async (req, res) => {
    const newCast = req.body;

    try {
        await castService.saveCast(newCast);

    } catch (err) {
        const errorMsg = getErrorMessage(err);
        return res.render('cast/create', { error: errorMsg, cast: newCast });
    }

    res.redirect('/');
});

export default castController;