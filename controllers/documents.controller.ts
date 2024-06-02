import { Response } from "express";
import * as error_handlers from '../error_handler/error_handler'
import Document from "../models/documents.model";
import { DocumentCreateRequest, DocumentReadRequest } from "../requests/Documents/documents";
import { checkForValidToken } from '../utils/token_management';

const create_document = async (req: DocumentCreateRequest, res: Response) => {
    console.log("Create Course Called");

    try {
        const error_handler = error_handlers.throw_error(req);

        await checkForValidToken(req);

        if(error_handler !== undefined) throw error_handler;

        let documentData:Partial<Document> = req.body;

        const newDocument = await Document.create(documentData);

        return res.status(200).json({
            status: 'success',
            message: newDocument
        });
    } catch(err:any){
        return error_handlers.error_handler(err, res);
    }
}


const read_document = async (req: DocumentReadRequest, res: Response) => {
    console.log("Read Course Called");

    try {
        const error_handler = error_handlers.throw_error(req);

        await checkForValidToken(req);

        if(error_handler !== undefined) throw error_handler;

        const documents_instance = await Document.getAllDocuments();

        return res.status(200).json({
            status: 'success',
            message: documents_instance
        });
    } catch(err){
        return error_handlers.error_handler(err, res);
    }
}

export {create_document, read_document};

