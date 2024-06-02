import { Request } from "express";

interface DocumentCreateRequest extends Request {
    body: {
        document_name: string,
        document_description: string,
        course_id: number,
        marked: boolean,
    }
}

interface DocumentReadRequest extends Request {
    query: {
        document_name: string
    }
}

export {DocumentCreateRequest, DocumentReadRequest};