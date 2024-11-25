import { Response, NextFunction} from "express";
import {CreateTaskRequest} from "../model/task-model";
import {TaskService} from "../service/task-service";
import {UserRequest} from "../type/user";


export class TaskController {
    static async createTask(req:UserRequest, res:Response, next:NextFunction) {
        try {
            const request: CreateTaskRequest = req.body as CreateTaskRequest;
            request.username = req.user.username;
            await TaskService.createTask(request);
            res.status(201).json({
                message: "Success!",
            });
        } catch (e) {
            next(e);
        }
    }
}