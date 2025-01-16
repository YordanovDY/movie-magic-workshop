import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';

const app = express();
const port = 3000;

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/static', express.static('./src/public'));

app.use(routes);

// app.get('/create', (req, res) => {
//     res.render('create');
// });

app.listen(port, () => console.log(`Server is listening on http://localhost:${port}...`));