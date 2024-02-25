
import { Response } from 'express';
import * as error_handlers from '../error_handler/error_handler.js';
import User from '../models/user.model.js';
import {UserCreateRequest, UserReadRequest} from '../requests/User/user-create.js'
import * as bcrypt from 'bcrypt';

const salt = 5

const create_user = async (req: UserCreateRequest, res: Response) => {
    console.log("Create User called");

    try {
        const error_handler = error_handlers.throw_error(req);

        if(error_handler !== undefined){
            throw error_handler;
        }

        let userData = req.body;

        userData.password = await bcrypt.hash(userData.password, salt);

        console.log(userData);

        const newUser = await User.createUser(userData);

        return res.status(200).json({
            status: 'success',
            message: newUser
        })
    } catch(err:any){
        return error_handlers.error_handler(err, res);
    }
}

const login = async (req:UserReadRequest, res:Response) => {
    console.log("Login Controller Called");

    try {
        const error_handler = error_handlers.throw_error(req);

        if(error_handler !== undefined){
            throw error_handler
        }

        const email:string = req.query.email;

        const user_details = await User.getUserByEmail(email);

        const validPassword = await bcrypt.compare(req.query.password, user_details!.password);

        if(!validPassword) throw {error: 'Invalid Password', type: 'custom', statusCode: 401};

        return res.status(200).json({
            status: 'success',
            message: user_details
        })
    } catch(err){
        return error_handlers.error_handler(err, res);
    }
}

export {create_user, login};
