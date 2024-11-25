import express from "express";
import {authMiddleware} from "../middleware/auth-middleware";
import {TaskController} from "../controller/task-controller";

export const privateRouter = express.Router();
// @ts-ignore
privateRouter.post("/api/v1/task", authMiddleware, TaskController.createTask)
// @ts-ignore
privateRouter.patch("/api/v1/task/:taskId(\\d+)", authMiddleware, TaskController.createTask)