import { Request, Response } from "express";
import { hashPassword } from '../utils/passwordUtils';

// Models
import models from '../models';

interface saveUserTypes {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    is_active: string;
}

const add = async (req: Request, res: Response): Promise<void> => {

    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const first_name: string = req.body.first_name;
    const last_name: string = req.body.last_name;
    const birth_date: string = req.body.birth_date;
    const is_active: string = req.body.is_active || 1;

    const hashedPassword: string = await hashPassword(password);

    try {

        const insertData: saveUserTypes = { username: username, 
                                            email: email, 
                                            password: hashedPassword, 
                                            first_name: first_name, 
                                            last_name: last_name, 
                                            birth_date: birth_date, 
                                            is_active: is_active };
        
        const insertFields = { fields: ['username', 'email', 'password', 'first_name', 'last_name', 'birth_date', 'is_active'] };

        const users = await models.users.create(insertData, insertFields);

        if (users) {
            res.status(201).json({ 'status': true, message: 'Successfully added.', 'inserted_id': users.id });
        } else {
            res.status(400).json({ 'status': false, message: "Can't add data." });
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

const show = async (req: Request, res: Response): Promise<void> => {
    
    const id: number = parseInt(req.params.id);
    const is_active: string = req.query.is_active?.toString() || '1';
    
    type conditionTypes = {
        id?: number,
        is_active: string
    }

    try {

        if (id) {
            let condition: conditionTypes = { id: id, is_active: is_active };
            var users = await models.users.findAll({ where: condition });
        } else {
            let condition: conditionTypes = { is_active: is_active };
            var users = await models.users.findAll({ where: condition });
        }

        if (users.length > 0) {
            res.status(200).json({'data': users});
        } else {
            res.status(200).json({ message: "No records found." });
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

const edit = async (req: Request, res: Response): Promise<void> => {

    const id: number = parseInt(req.params.id);
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const first_name: string = req.body.first_name;
    const last_name: string = req.body.last_name;
    const birth_date: string = req.body.birth_date;
    const is_active: string = req.body.is_active || 1;

    try {

        const updateData: saveUserTypes = { username: username, 
                                            email: email, 
                                            password: password, 
                                            first_name: first_name, 
                                            last_name: last_name, 
                                            birth_date: birth_date, 
                                            is_active: is_active };

        const users = await models.users.update(updateData, { where: { id: id } });

        if (users) {
            res.status(200).json({ 'status': true, message: 'Successfully saved.', 'affected_id': id });
        } else {
            res.status(400);
            res.json({ 'status': false, message: "Can't update data." });
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

const destroy = async (req: Request, res: Response): Promise<void> => {

    const id: number = parseInt(req.params.id);

    try {

        const users = await models.users.delete({ where: { id: id } });

        if (users) {
            res.status(200).json({ 'status': true, message: 'Successfully deleted.', 'affected_id': id });
        } else {
            res.status(400).json({ 'status': false, message: "Can't delete data." });
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

export {
    add,
    show,
    edit,
    destroy
};