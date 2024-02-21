
import {validationResult} from 'express-validator';
import * as error_handlers from '../error_handler/error_handler';

const create_user = async (req: Request, res: Response) => {
    console.log("Create User called");

    try {
        const result = validationResult(req);
    
        error_handlers.request_errors(result);

        
    } catch(err){
        error_handlers.error_handler(err, res);
    }
}
