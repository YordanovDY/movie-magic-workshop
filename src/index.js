import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';
import showRatingHelper from './helpers/rating-helper.js';

const app = express();
const port = 3000;

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        showRating: showRatingHelper
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/static', express.static('./src/public'));
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(port, () => console.log(`Server is listening on http://localhost:${port}...`));