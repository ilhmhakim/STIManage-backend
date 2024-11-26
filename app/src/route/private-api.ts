import express from "express";
import {authMiddleware} from "../middleware/auth-middleware";
import {TaskController} from "../controller/task-controller";
import {UserController} from "../controller/user-controller";

export const privateRouter = express.Router();
// @ts-ignore
privateRouter.post("/api/v1/task", authMiddleware, TaskController.createTask);
// @ts-ignore
privateRouter.patch("/api/v1/task/:taskId(\\d+)", authMiddleware, TaskController.updateTask);
// @ts-ignore
privateRouter.get("/api/v1/task/:taskId(\\d+)", authMiddleware, TaskController.getTaskDetail);
// @ts-ignore
privateRouter.delete("/api/v1/task/:taskId(\\d+)", authMiddleware, TaskController.deleteTask);
// @ts-ignore
privateRouter.get("/api/v1/tasks/summary", authMiddleware, TaskController.getSummary);
// @ts-ignore
privateRouter.get("/api/v1/tasks", authMiddleware, TaskController.getDashboard)
// @ts-ignore
privateRouter.get("/api/v1/tasks/download", authMiddleware, TaskController.downloadDashboard)
// @ts-ignore
privateRouter.delete("/api/v1/logout", authMiddleware, UserController.logout)