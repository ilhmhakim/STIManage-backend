import express from "express";
import {publicRouter} from "../route/public-api";
import {errorMiddleware} from "../middleware/error-middleware";
import {privateRouter} from "../route/private-api";
import cors from "cors";

export const web = express();
web.use(cors());
web.use(express.json()); // Memproses JSON
web.use(express.urlencoded({ extended: false }));
web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);