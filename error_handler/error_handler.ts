
import { Request, Response } from "express";
import { validationResult } from "express-validator";

interface ErrorResponseType {
    error?: String,
    errors?: String[],
    type: string,
    statusCode: number
}

const error_handler = async (err:any, res: Response) => {
    console.log("Error Handler Called");

    if(err.errors !== undefined){
        return res.status(err.statusCode || 400).json({
            status: 'failed',
            message: 'Request does not meet Requirements',
            errors: err.errors
        })
    }

    if(err.error !== undefined){
        console.log("The status code is: ", err.statusCode);
        console.log("The error is: ", err);
        return res.status(err.statusCode || 400).json({
            status: 'failed',
            message: err.error
        })
    }

    console.log(err);

    return res.status(500).json({
        status: 'failed',
        message: 'Oops!! We ran into an error'
    })
}

const throw_error = (req:Request) => {
    const result = validationResult(req);

    if(!result.isEmpty()){
        let return_array:string[] = [];
        result.array().forEach((element) => {
            return_array.push(element.msg);
        })
        let return_object:ErrorResponseType = return_array.length === 1 ? {error: return_array[0], type: 'custom', statusCode: 406} : {errors: return_array, type: 'custom', statusCode: 406};
        // throw new Error(JSON.stringify(return_object));
        return return_object;
    } else {
        return undefined
    }
}


export {error_handler, throw_error};