// src/middleware/auth-middleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {jwtRefresh, jwtSecret} from "../config/jwt";
import { UserPayload, UserRequest } from "../type/user";


export const issueAccessToken = (user: UserPayload): string => {
    return jwt.sign(user, jwtSecret.secret!, jwtSecret.options);
};

export const issueRefreshToken = (user: UserPayload): string => {
    return jwt.sign(user, jwtRefresh.secret!, jwtRefresh.options);
};

// Middleware autentikasi JWT
export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        // Ambil token dari header Authorization
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ errors: "Token tidak tersedia" }).end();
        }

        // Validasi format token
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ errors: "Format token invalid" }).end();
        }

        const token = authHeader.split(" ")[1];

        // Verifikasi dan decode token JWT
        const decodedToken = jwt.verify(token, jwtSecret.secret!) as jwt.JwtPayload;

        // Ekstrak username dari token yang telah didecode
        const username = decodedToken.username;

        if (!username) {
            return res.status(401).json({ errors: "Token tidak valid: username tidak ditemukan" }).end();
        }

        // Tambahkan informasi username ke req.user
        req.user = { username };

        // Lanjutkan ke middleware/handler berikutnya
        next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ errors: "Token kadaluarsa" }).end();
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ errors: "Token invalid" }).end();
        } else {
            console.error("Middleware Error:", error);
            return res.status(500).json({ errors: "Internal Server Error" }).end();
        }
    }
};