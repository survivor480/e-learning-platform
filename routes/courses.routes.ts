import express from 'express';
import {check, header, query} from 'express-validator';
import * as course_controller from '../controllers/course.controller';


const router = express.Router();

// router.post('/create-course', 
//     check('course_name').isString().withMessage('Enter Proper Course Name'),
//     check('course_fees').isNumeric().withMessage('Enter Proper Course Fees'),
//     header('authorization').withMessage('You may need Authorization for this'), course_controller.create_course);

