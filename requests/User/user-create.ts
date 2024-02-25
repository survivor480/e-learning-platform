import { Request } from "express";


interface UserCreateRequest extends Request {
    body: {
        username: string,
        name: string,
        email: string,
        phone_number: number,
        password: string
    }
}

interface UserReadRequest extends Request {
    query: {
        email: string,
        password: string
    }
}

export {UserCreateRequest, UserReadRequest}