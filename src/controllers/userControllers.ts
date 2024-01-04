import { Request, Response } from "express";

// Models
import db from '../models';

const add = async (req: Request, res: Response) => {

    const image_file: string = req.body.image_file;
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const first_name: string = req.body.first_name;
    const last_name: string = req.body.last_name;
    const birth_date: string = req.body.birth_date;
    const is_active: string = req.body.is_active || 1;

    try {

        const users = await db.userModel.create({ image_file: image_file, 
                                                    username: username, 
                                                    email: email, 
                                                    password: password, 
                                                    first_name: first_name, 
                                                    last_name: last_name, 
                                                    birth_date: birth_date, 
                                                    is_active: is_active }, 
                                                { fields: ['image_file', 'username', 'email', 'password', 'first_name', 'last_name', 'birth_date', 'is_active'] });

        if (users) {
            res.status(200);
            res.json({ 'status': true, message: 'Successfully added.', 'inserted_id': users.id });
        } else {
            res.status(400);
            res.json({ 'status': false, message: "Can't add data." });
        }

    } catch (error: any) {
        res.status(500);
        res.json({ message: error.stack });
    }
    res.end();

}

const show = async (req: Request, res: Response) => {
    
    const id: number = parseInt(req.params.id);
    const is_active: unknown = req.query.is_active || '1';

    try {

        if (id) {
            let condition: any = { id: id as number, is_active: is_active };
            var users = await db.userModel.findAll({ where: condition });
        } else {
            let condition: any = { is_active: is_active };
            var users = await db.userModel.findAll({ where: condition });
        }

        if (users.length > 0) {
            res.status(200);
            res.json({'data': users});
        } else {
            res.status(200);
            res.json({ message: "No records found." });
        }

    } catch (error: any) {
        res.status(500);
        res.json({ message: error.stack });
    }
    res.end();

}

const edit = async (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id);

    const image_file: string = req.body.image_file;
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const first_name: string = req.body.first_name;
    const last_name: string = req.body.last_name;
    const birth_date: string = req.body.birth_date;
    const is_active: string = req.body.is_active || 1;

    try {

        const users = await db.userModel.update({ image_file: image_file, 
                                                    username: username, 
                                                    email: email, 
                                                    password: password, 
                                                    first_name: first_name, 
                                                    last_name: last_name, 
                                                    birth_date: birth_date, 
                                                    is_active: is_active }, 
                                                    {
                                                        where: {
                                                          id: id
                                                        }
                                                    });

        if (users) {
            res.status(200);
            res.json({ 'status': true, message: 'Successfully saved.', 'affected_id': id });
        } else {
            res.status(400);
            res.json({ 'status': false, message: "Can't update data." });
        }

    } catch (error: any) {
        res.status(500);
        res.json({ message: error.stack });
    }
    res.end();

}

const destroy = async (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id);

    try {

        const users = await db.userModel.delete({ where: { id: id } });

        if (users) {
            res.status(200);
            res.json({ 'status': true, message: 'Successfully deleted.', 'affected_id': id });
        } else {
            res.status(400);
            res.json({ 'status': false, message: "Can't delete data." });
        }

    } catch (error: any) {
        res.status(500);
        res.json({ message: error.stack });
    }
    res.end();

}

export {
    add,
    show,
    edit,
    destroy
};