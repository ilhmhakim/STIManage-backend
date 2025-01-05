"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtRefresh = exports.jwtSecret = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.jwtSecret = {
    secret: process.env.JWT_SECRET,
    options: {
        expiresIn: process.env.JWT_SECRET_EXPIRE
    }
};
exports.jwtRefresh = {
    secret: process.env.JWT_SECRET_REFRESH,
    options: {
        expiresIn: process.env.JWT_SECRET_REFRESH_EXPIRE
    }
};
