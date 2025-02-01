import handlebars from 'express-handlebars';
import showRatingHelper from '../helpers/rating-helper.js'

export default function handlebarsInit(app){
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
}