import { Response, NextFunction} from "express";
import {
    CreateTaskRequest,
    DeleteTaskRequest,
    GetDashboardRequest,
    GetTaskDetailRequest,
    UpdateTaskRequest
} from "../model/task-model";
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

    static async updateTask(req:UserRequest, res:Response, next:NextFunction) {
        try {
            const request: UpdateTaskRequest = req.body as UpdateTaskRequest;
            request.username = req.user.username;
            request.task_id = Number(req.params.taskId);

            await TaskService.updateTask(request);

            res.status(201).json({
                message: "Success!"
            });
        } catch (e) {
            next(e);
        }
    }

    static async getTaskDetail(req:UserRequest, res:Response, next:NextFunction) {
        try {
            const request: GetTaskDetailRequest = {
                task_id: Number(req.params.taskId)
            }

            const response = await TaskService.getTaskDetail(request);

            res.status(200).json({
                message: "Success!",
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async deleteTask(req:UserRequest, res:Response, next:NextFunction) {
        try {
            const request: DeleteTaskRequest = {
                task_id: Number(req.params.taskId)
            }

            await TaskService.deleteTask(request);

            res.status(200).json({
                message: "Success!",
            });
        } catch (e) {
            next(e);
        }
    }

    static async getSummary(req:UserRequest, res:Response, next:NextFunction) {
        try {
            const response = await TaskService.getTaskSummary();

            res.status(200).json({
               message: "Success!",
               data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async getDashboard(req:UserRequest, res:Response, next:NextFunction) {
        try {
            await TaskService.updateDeadlineStatus();

            const response = await TaskService.getDashboard();

            res.status(200).json({
                message: "Success!",
                data: response
            });
        } catch (e) {
            next(e);
        }
    }
    
    static async downloadDashboard(req:UserRequest, res:Response, next:NextFunction) {
        try {
            // Panggil service untuk mendapatkan workbook
            const workbook = await TaskService.downloadDashboard();

            // Buat response Excel file di controller
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=tasks_dashboard.xlsx"
            );

            // Tuliskan workbook ke response
            await workbook.xlsx.write(res);
            res.status(200).end();
        } catch (e) {
            next(e);
        }
    }

}