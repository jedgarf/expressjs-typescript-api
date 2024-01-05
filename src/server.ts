import express, { Application, Request, Response } from 'express';
import path from 'path';
import compression from 'compression';
import helmet from "helmet";
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Config
import config from "./config";
// Routes
import routes from './routes';
// Helpers
import helpers from './helpers';

const app: Application = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cors(helpers.cors));
app.use(compression());
app.use(helmet());
app.use(cookieParser());

// API Cache
if (config.api.apicache_min as number > 0) {
    app.use(helpers.apiCache);
}

if (config.api.env === 'PRODUCTION') {
    app.use(helpers.rateLimiter);
}

// Routes
app.use('/', routes.auth);
app.use('/users', routes.users);

// error when browse wrong route
app.use((err: Error, req: Request, res: Response) => {
    res.status(400).json({ error: err.stack });
});

const port: string | number = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server running on port ${port}`); });
  