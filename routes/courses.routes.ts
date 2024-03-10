
/**
 * @swagger
 * tags:
 *  name: Courses
 *  description: Managing Courses
*/



import express from 'express';
import {body, header} from 'express-validator';
import * as course_controller from '../controllers/course.controller';

const router = express.Router();

/**
 * @swagger
 * /course/create:
 *  post:
 *      summary: Creates a Course
 *      tags: [Courses]
 *      security:
 *          -   bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          course_name:
 *                              type: string
 *                              example: UPSC
 *                          course_fees:
 *                              type: number
 *                              example: 24000
 * 
 *      responses:
 *          '200':
 *              status: success
 *              message: Course Created Successfully
 *              description: On Creation of a Course
 *          '400':
 *              status: failed
 *              message: Course Creation Failed
 *              description: On Failure to create a Course
 *          '406':
 *              status: failed
 *              message: Enter proper Arguments
 *              description: Enter proper Arguments * 
 *          '409':
 *              status: failed
 *              message: What you want to create already exists
 *              description: Data already exists
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.post('/create',
    body('course_name').isString().withMessage('Enter proper Course Name'),
    body('course_fees').isNumeric().withMessage('Enter proper Course Fees'),
    header('authorization').isString().withMessage("Unauthorized"),
    course_controller.create_course
);


/**
 * 
 * @swagger
 * /course/read:
 *  get:
 *      summary: Login by a user
 *      tags: [Courses]
 *      security:
 *          -   bearerAuth: []
 *      responses:
 *          '200':
 *              status: success
 *              message: Courses Fetched Successfully
 *              description: On successful fetch of Courses
 *          '400':
 *              status: failed
 *              message: Courses Fetch Failed
 *              description: On Unsuccessful fetch of Courses
 *          '406':
 *              status: failed
 *              message: Enter proper Arguments
 *              description: Enter proper Arguments
 *          '409':
 *              status: failed
 *              message: What you want to create already exists
 *              description: Data already exists
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.get('/read', header('authorization').isString().withMessage("Unauthorized"), course_controller.read_course);


export {router};
