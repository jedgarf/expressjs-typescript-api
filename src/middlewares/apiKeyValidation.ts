import { Request, Response, NextFunction } from "express";
import config from '../config';


// Middleware for validating request body using Joi schema
const apiKeyValidation = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization != 'Bearer ' + config.api.apiKey) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
    next();
};

export default apiKeyValidation;