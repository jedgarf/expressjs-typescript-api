import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import compression from 'compression';
import helmet from "helmet";
import cors from 'cors';
import corsOptions from './config/cors.config';
import * as settings from './config/settings.config';

// import routes
import routes from './routes';

const app: Application = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cors(corsOptions));
app.use(compression());
app.use(helmet());

// Routes
app.use('/users', routes.users);

// error when browse wrong route
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ error: err.stack });
});

const port: any = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server running on port ${port}`); });
  