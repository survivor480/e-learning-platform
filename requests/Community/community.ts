import { Request } from "express";

interface CommunityCreateRequest extends Request {
    body: {
        community_name: string,
        community_description: string,
        educator_id: number
    }
}

interface CommunityReadRequest extends Request {
    query: {
        community_name: string
    }
}

interface CommunityUpdateRequest extends Request {
    body: {
        community_id: number,
        community_name: string,
        community_description: string,
        educator_id: number,
    }
}

export {CommunityCreateRequest, CommunityReadRequest, CommunityUpdateRequest};