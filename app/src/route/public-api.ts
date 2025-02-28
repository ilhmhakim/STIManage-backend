import express from "express";
import {UserController} from "../controller/user-controller";

export const publicRouter = express.Router();
publicRouter.post("/api/v1/registration", UserController.register);
publicRouter.post("/api/v1/login", UserController.login);
publicRouter.post("/api/v1/refresh", UserController.refreshAccessToken);