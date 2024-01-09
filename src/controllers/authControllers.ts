import { Request, Response } from "express";

// Helpers
import helper from '../helpers';
// Utils
import { comparePasswords } from '../utils/passwordUtils';
// Models
import models from '../models';

const login = async (req: Request, res: Response): Promise<void> => {
    
    const email: string = req.body.email;
    const password: string = req.body.password;
    
    type conditionTypes = {
        email: string;
    }

    try {

        const condition: conditionTypes = { email: email };
        const users: any = await models.users.findOne({ where: condition });

        // email checker
        if (users) {
            const isPasswordMatch: boolean = await comparePasswords(password, users.password);
            if (isPasswordMatch) {

                let payload = { id: users.id, email: users.email };
                let access_token = helper.jwt.generateAccessToken(payload);
                let refresh_token = helper.jwt.generateRefreshToken(payload);
                res.cookie('access_token', access_token, { httpOnly: true });
                res.cookie('refresh_token', refresh_token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true }); // 7 days

                res.status(200).json({ status: true, message: 'Login successful.', access_token: access_token, refresh_token: refresh_token });
            } else {
                res.status(400).json({ status: false, message: "Either email or password are invalid." });
            }
        } else {
            res.status(400).json({ status: false, message: "Either email or password are invalid." });
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.stack });
        } else {
            console.error('Unexpected error:', error);
        }
    }
    res.end();
}

const logout = (req: Request, res: Response): void => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.status(200).json({ status: true, message: "User blog-out." });
}

export {
    login,
    logout
};