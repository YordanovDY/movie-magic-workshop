import express from 'express';
import routes from './routes.js';
import { authMiddleware } from './middlewares/auth-middleware.js';
import handlebarsInit from './config/handlebars-init.js';
import databaseInit from './config/database-init.js';
import expressInit from './config/express-init.js';

const app = express();
const port = 3000;

// DB Config
await databaseInit();

// Handlebars Config
handlebarsInit(app);

// Express Config
expressInit(app);

// Custom Middlewares
app.use(authMiddleware);

// Routes Config
app.use(routes);

app.listen(port, () => console.log(`Server is listening on http://localhost:${port}...`));