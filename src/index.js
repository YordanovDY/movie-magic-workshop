import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';
import showRatingHelper from './helpers/rating-helper.js';
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();
const port = 3000;
const { DATABASE_URI } = process.env;

// DB Config
try {
    await mongoose.connect(DATABASE_URI);
    console.log('DB Connected Successfully.');

} catch (err) {
    console.error('Cannot connect to DB:\n' + err.message);

}

// Handlebars Config
app.engine('hbs', handlebars.engine({
    extname: 'hbs',

    helpers: {
        showRating: showRatingHelper
    },
    
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');


// Express Config
app.use('/static', express.static('./src/public'));
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(port, () => console.log(`Server is listening on http://localhost:${port}...`));