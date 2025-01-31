import { Router } from "express";
import castService from "../services/cast-service.js";
import { isAuthenticated } from "../middlewares/auth-middleware.js";

const castController = Router();

castController.use(isAuthenticated);

castController.get('/create', (req, res) => {
    res.render('cast/create');
});

castController.post('/create', async (req, res) =>{
    const newCast = req.body;

    await castService.saveCast(newCast);
    
    res.redirect('/');
});

export default castController;