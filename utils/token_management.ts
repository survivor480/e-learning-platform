
import * as crypto from 'crypto-js';
import User from '../models/user.model'
import { Request } from 'express';

const server_secret = 'This project is named learning-backend. Shhh... donot tell anybody';

const create_token = async (data: User) => {
    const token = await crypto.AES.encrypt(JSON.stringify(data), server_secret);

    console.log("The token generated is: ", token.toString());
    return `Bearer ${token.toString()}`;
}

const checkForValidToken = async (req: Request) => {
    const token:string = String(req.headers.authorization).split(' ')[1];

    if(String(req.headers.authorization).split(' ')[0] === 'Bearer') throw {error: 'Not a Bearer Token', type: 'custom'}

    if(!token) throw {error: 'Unauthorized', type: 'custom', statusCode: 401}

    const bytes = crypto.AES.decrypt(token, server_secret);
    const decryptedData:User = JSON.parse(bytes.toString(crypto.enc.Utf8));

    if(!decryptedData.username) throw {error: 'Unauthorized', type: 'custom', statusCode: 401};

    let user_data = await User.getUserByEmail(decryptedData.email);

    if(!user_data) throw {error: 'Unauthorized', type: 'custom', statusCode: 401};

    return user_data;
}

export {create_token, checkForValidToken};
