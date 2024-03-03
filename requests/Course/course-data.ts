
import { Request } from "express";


interface CourseCreateRequest extends Request {
    headers: {
        authorization: string
    }
    body: {
        course_name: string,
        course_fees: string
    }
}

interface CourseReadRequest extends Request {
    query: {
        course_name: string
    }
}

export {CourseCreateRequest, CourseReadRequest};