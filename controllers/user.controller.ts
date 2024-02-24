
import { Request, Response } from 'express';
import * as error_handlers from '../error_handler/error_handler';
import User from '../models/user.model';

const create_user = async (req: Request, res: Response) => {
    console.log("Create User called");

    try {
        const error_handler = error_handlers.throw_error(req);

        if(error_handler !== undefined){
            throw error_handler;
        }

        const userData = req.body;

        const newUser = await User.createUser(userData);

        return res.status(200).json({
            status: 'success',
            message: newUser
        })
    } catch(err:any){
        return error_handlers.error_handler(err, res);
    }
}


const login = async (req:Request, res:Response) => {
    console.log("Login Controller Called");

    try {
        const error_handler = error_handlers.throw_error(req);

        if(error_handler !== undefined){
            throw error_handler
        }

        const email:string = req.query.email;

        const user_details = await User.getUserByEmail(email);

        return res.status(200).json({
            status: 'success',
            message: user_details
        })
    } catch(err){
        return error_handlers.error_handler(err, res);
    }
}

export {create_user, login};
