import express from 'express';
import {body, query} from 'express-validator';
import * as community_controller from '../controllers/community.controller';

const router = express.Router();

router.post('/create-community', 
    body('community_name').isString().withMessage('Enter proper Community Name'),
    body('community_description').isString().withMessage('Enter proper Community Description'),
    body('educator_id').isNumeric().withMessage('Enter proper Educator id'),
    community_controller.create_community
);

router.get('/get-communities',
    query('community_name').optional().isString().withMessage('Enter proper Community Name'),
    community_controller.read_community
)

router.post('/update-community',
    body('community_id').isNumeric().withMessage('Enter proper Community id'),
    body('community_name').isString().withMessage('Enter proper Community Name'),
    body('community_description').isString().withMessage('Enter proper Community Description'),
    body('educator_id').isNumeric().withMessage('Enter proper Educator id'),
)

export {router};
