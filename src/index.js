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

// app.get('/', (req, res) => {
//     res.render('home');
// });

// app.get('/about', (req, res) => {
//     res.render('about');
// });

// app.get('/create', (req, res) => {
//     res.render('create');
// });

// app.get('*', (req, res) => {
//     res.render('404');
// });

app.listen(port, () => console.log(`Server is listening on http://localhost:${port}...`));