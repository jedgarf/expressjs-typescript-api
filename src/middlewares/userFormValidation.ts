import { Request, Response, NextFunction } from "express";
import * as Joi from 'joi';

// Data Validations
const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    first_name: Joi.string().min(2).required(),
    last_name: Joi.string().min(2).required(),
    birth_date: Joi.date().required(),
    is_active: Joi.number().integer(),
})

// Middleware for validating request body using Joi schema
const userFormValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
  
    if (error) {
        // Collect all validation errors
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ status: false, errors });
    }
  
    next();
};

export default userFormValidation;