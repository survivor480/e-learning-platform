import express from 'express';
import {check, query} from 'express-validator';
import * as user_controller from '../controllers/user.controller';

const router = express.Router();

router.post('/create-user', 
    check('username', 'Enter proper Username').isString(),
    check('name', 'Enter proper Name').isString(),
    check('email', 'Enter proper Email').isString().isEmail(),
    check('password', 'Enter proper Password').isString(),
    check('phone_number', 'Enter proper Phone Number').isNumeric().isLength({min: 10, max: 10}),
    user_controller.create_user
)



router.get('/get-user',
    query('email').isString().withMessage('Enter proper Email'),
    query('password').isString().withMessage('Enter a Valid Password'),
    user_controller.login
)

export {router};
