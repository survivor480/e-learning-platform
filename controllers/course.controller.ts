
import { Response } from "express";
import * as error_handlers from '../error_handler/error_handler'
import Course from "../models/courses.model";
import { CourseCreateRequest, CourseReadRequest } from "../requests/Course/course-data";
import { checkForValidToken } from '../utils/token_management';

const create_course = async (req: CourseCreateRequest, res: Response) => {
    console.log("Create Course Called");

    try {
        const error_handler = error_handlers.throw_error(req);

        await checkForValidToken(req);

        if(error_handler !== undefined) throw error_handler;

        let courseData:Partial<Course> = req.body;

        const newCourse = await Course.create(courseData);

        return res.status(200).json({
            status: 'success',
            message: newCourse
        });
    } catch(err:any){
        return error_handlers.error_handler(err, res);
    }
}


const read_course = async (req: CourseReadRequest, res: Response) => {
    console.log("Read Course Called");

    try {
        const error_handler = error_handlers.throw_error(req);

        await checkForValidToken(req);

        if(error_handler !== undefined) throw error_handler;

        const newCourse = await Course.getAllCourses();

        return res.status(200).json({
            status: 'success',
            message: newCourse
        });
    } catch(err){
        return error_handlers.error_handler(err, res);
    }
}

export {create_course, read_course};

