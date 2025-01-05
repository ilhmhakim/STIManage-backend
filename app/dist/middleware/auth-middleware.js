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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.issueRefreshToken = exports.issueAccessToken = void 0;
// src/middleware/auth-middleware.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const issueAccessToken = (user) => {
    return jsonwebtoken_1.default.sign(user, jwt_1.jwtSecret.secret, jwt_1.jwtSecret.options);
};
exports.issueAccessToken = issueAccessToken;
const issueRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign(user, jwt_1.jwtRefresh.secret, jwt_1.jwtRefresh.options);
};
exports.issueRefreshToken = issueRefreshToken;
// Middleware autentikasi JWT
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const decodedToken = jsonwebtoken_1.default.verify(token, jwt_1.jwtSecret.secret);
        // Ekstrak username dari token yang telah didecode
        const username = decodedToken.username;
        if (!username) {
            return res.status(401).json({ errors: "Token tidak valid: username tidak ditemukan" }).end();
        }
        // Tambahkan informasi username ke req.user
        req.user = { username };
        // Lanjutkan ke middleware/handler berikutnya
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ errors: "Token kadaluarsa" }).end();
        }
        else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ errors: "Token invalid" }).end();
        }
        else {
            console.error("Middleware Error:", error);
            return res.status(500).json({ errors: "Internal Server Error" }).end();
        }
    }
});
exports.authMiddleware = authMiddleware;
