"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../service/task-service");
class TaskController {
    static createTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.username = req.user.username;
                yield task_service_1.TaskService.createTask(request);
                res.status(201).json({
                    message: "Success!",
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static updateTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.username = req.user.username;
                request.task_id = Number(req.params.taskId);
                yield task_service_1.TaskService.updateTask(request);
                res.status(201).json({
                    message: "Success!"
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getTaskDetail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    task_id: Number(req.params.taskId)
                };
                const response = yield task_service_1.TaskService.getTaskDetail(request);
                res.status(200).json({
                    message: "Success!",
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    task_id: Number(req.params.taskId)
                };
                yield task_service_1.TaskService.deleteTask(request);
                res.status(200).json({
                    message: "Success!",
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getSummary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield task_service_1.TaskService.getTaskSummary();
                res.status(200).json({
                    message: "Success!",
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getDashboard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield task_service_1.TaskService.updateDeadlineStatus();
                const response = yield task_service_1.TaskService.getDashboard();
                res.status(200).json({
                    message: "Success!",
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static downloadDashboard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Panggil service untuk mendapatkan workbook
                const workbook = yield task_service_1.TaskService.downloadDashboard();
                // Buat response Excel file di controller
                res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                res.setHeader("Content-Disposition", "attachment; filename=tasks_dashboard.xlsx");
                // Tuliskan workbook ke response
                yield workbook.xlsx.write(res);
                res.status(200).end();
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.TaskController = TaskController;
