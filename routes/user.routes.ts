import express from 'express';
import {check, query} from 'express-validator';
import * as user_controller from '../controllers/user.controller';

const router = express.Router();

router.post('/create-user', 
    check('username').isString().withMessage('Enter proper Username').matches('([A-Z]|[a-z])+[0-9]+').withMessage('Username should have characters at the start and numbers at the end'),
    check('name').isString().withMessage('Enter proper Name'),
    check('email').isString().withMessage('Enter proper Email'),
    check('password').isString().withMessage('Enter a proper Password'),
    check('phone_number').isNumeric().withMessage('Enter a proper Phone Number').isLength({min: 7, max: 15}).withMessage('Phone Number should contain 7-15 digits'),
    user_controller.create_user
);



router.get('/get-user',
    query('email').isString().withMessage('Enter proper Email'),
    query('password').isString().withMessage('Enter a Valid Password'),
    user_controller.login
)

export {router};
