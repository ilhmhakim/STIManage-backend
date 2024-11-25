import {JwtPayload} from "jsonwebtoken";
import {Request} from "express";

export interface UserRequest extends Request {
    user: {
        username: string;
    }
}

export interface UserPayload extends JwtPayload {
    username: string;
}
