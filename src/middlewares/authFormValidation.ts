import { Request, Response, NextFunction } from "express";
import * as Joi from 'joi';

// Data Validations
const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

// Middleware for validating request body using Joi schema
const authFormValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = authSchema.validate(req.body, { abortEarly: false });
  
    if (error) {
        // Collect all validation errors
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ status: false, errors });
    }
  
    next();
};

export default authFormValidation;