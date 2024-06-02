import { Response } from "express";
import * as error_handlers from '../error_handler/error_handler'
import Community from "../models/community.model";
import { CommunityCreateRequest, CommunityReadRequest, CommunityUpdateRequest } from "../requests/Community/community";
import { checkForValidToken } from '../utils/token_management';

const create_community = async (req: CommunityCreateRequest, res: Response) => {
    console.log("Create Course Called");

    try {
        const error_handler = error_handlers.throw_error(req);

        await checkForValidToken(req);

        if(error_handler !== undefined) throw error_handler;

        let communityData:Partial<Community> = req.body;

        const newCommunity = await Community.create(communityData);

        return res.status(200).json({
            status: 'success',
            message: newCommunity
        });
    } catch(err:any){
        return error_handlers.error_handler(err, res);
    }
}


const read_community = async (req: CommunityReadRequest, res: Response) => {
    console.log("Read Course Called");

    try {
        const error_handler = error_handlers.throw_error(req);

        await checkForValidToken(req);

        if(error_handler !== undefined) throw error_handler;

        const newCommunity = await Community.getAllCommunity();

        return res.status(200).json({
            status: 'success',
            message: newCommunity
        });
    } catch(err){
        return error_handlers.error_handler(err, res);
    }
}

const update_community = async (req: CommunityUpdateRequest, res: Response) => {
    console.log("The Update Community API was called");

    try {
        const error_handler = error_handlers.throw_error(req);

        await checkForValidToken(req);

        if(error_handler !== undefined) throw error_handler;

        const communityData:Partial<Community> = req.body;

        await Community.updateCommunity(communityData);

        return res.status(200).json({
            status: 'success',
            message: 'Community Updated Successfully'
        })
    } catch(err) {
        return error_handlers.error_handler(err, res);
    }
}

export {create_community, read_community, update_community};

