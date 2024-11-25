import {Request, Response, NextFunction} from "express";
import {UserLoginRequest, UserRegisterRequest} from "../model/user-model";
import {UserService} from "../service/user-service";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: UserRegisterRequest = req.body as UserRegisterRequest;
            await UserService.register(request);
            res.status(201).json({
                message: "Success!"
            });
        } catch (e) {
            next(e);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: UserLoginRequest = req.body as UserLoginRequest;
            const user = await UserService.login(request);
            res.status(200).json({
                message: "Success!",
                data: user
            });
        } catch (e) {
            next(e);
        }
    }
}