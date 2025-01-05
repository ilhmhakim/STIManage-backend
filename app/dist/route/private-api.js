"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const task_controller_1 = require("../controller/task-controller");
const user_controller_1 = require("../controller/user-controller");
exports.privateRouter = express_1.default.Router();
// @ts-ignore
exports.privateRouter.post("/api/v1/task", auth_middleware_1.authMiddleware, task_controller_1.TaskController.createTask);
// @ts-ignore
exports.privateRouter.patch("/api/v1/task/:taskId(\\d+)", auth_middleware_1.authMiddleware, task_controller_1.TaskController.updateTask);
// @ts-ignore
exports.privateRouter.get("/api/v1/task/:taskId(\\d+)", auth_middleware_1.authMiddleware, task_controller_1.TaskController.getTaskDetail);
// @ts-ignore
exports.privateRouter.delete("/api/v1/task/:taskId(\\d+)", auth_middleware_1.authMiddleware, task_controller_1.TaskController.deleteTask);
// @ts-ignore
exports.privateRouter.get("/api/v1/tasks/summary", auth_middleware_1.authMiddleware, task_controller_1.TaskController.getSummary);
// @ts-ignore
exports.privateRouter.get("/api/v1/tasks", auth_middleware_1.authMiddleware, task_controller_1.TaskController.getDashboard);
// @ts-ignore
exports.privateRouter.get("/api/v1/tasks/download", auth_middleware_1.authMiddleware, task_controller_1.TaskController.downloadDashboard);
// @ts-ignore
exports.privateRouter.delete("/api/v1/logout", auth_middleware_1.authMiddleware, user_controller_1.UserController.logout);
