
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Managing Users
 */

import express from 'express';
import {check, query} from 'express-validator';
import * as user_controller from '../controllers/user.controller';

const router = express.Router();
/**
 * @swagger
 * /user/create-user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: sudhanshu899
 *               name:
 *                 type: string
 *                 example: Sudhanshu Tiwary
 *               email:
 *                 type: string
 *                 example: sudhanshutiwary07@gmail.com
 *               password:
 *                 type: string
 *                 example: '#Kanoon314#'
 *               phone_number:
 *                 type: number
 *                 example: 9876543210

 *     responses:
 *       '200':
 *         status: success
 *         message: User Created Successfully
 *         description: On successful creation of a User    
 *       '400':
 *         status: failed
 *         message: User Creation Failed
 *         description: Bad request
 *       '406':
 *         status: failed
 *         message: Enter proper Arguments
 *         description: Enter proper Arguments
 *       '409':
 *         status: failed
 *         message: What you want to create already exists
 *         description: Data already exists
 */

router.post('/create-user', 
    check('username').isString().withMessage('Enter proper Username').matches('([A-Z]|[a-z])+[0-9]+').withMessage('Username should have characters at the start and numbers at the end'),
    check('name').isString().withMessage('Enter proper Name'),
    check('email').isString().withMessage('Enter proper Email'),
    check('password').isString().withMessage('Enter a proper Password'),
    check('phone_number').isNumeric().withMessage('Enter a proper Phone Number').isLength({min: 7, max: 15}).withMessage('Phone Number should contain 7-15 digits'),
    user_controller.create_user
);


/**
 * 
 * @swagger
 * /user/get-user:
 *  get:
 *      summary: Login by a user
 *      tags: [Users]
 *      parameters:
 *          -   in: query
 *              name: email
 *              schema:
 *                  type: string
 *              description: This is to get the enail of the user
 *              example: sudhanshutiwary07@gmail.com
 *          -   in: query
 *              name: password
 *              schema:
 *                  type: password
 *              description: The password of the user
 *              example: '#Kanoon314#'
 *      responses:
 *          '200':
 *              status: success
 *              message: Logged in successfully
 *              description: On Successful Login By User
 *          '400':
 *              status: failed
 *              message: Login Unsuccessful
 *              description: On Unsuccessful Login By User
 *          '406':
 *              status: failed
 *              message: Enter proper Arguments
 *              description: Enter proper Arguments
 *          '409':
 *              status: failed
 *              message: What you want to create already exists
 *              description: Data already exists 
 */


router.get('/get-user',
    query('email').isString().withMessage('Enter proper Email'),
    query('password').isString().withMessage('Enter a Valid Password'),
    user_controller.login
)

export {router};
