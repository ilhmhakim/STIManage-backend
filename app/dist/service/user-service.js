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
exports.UserService = void 0;
const user_model_1 = require("../model/user-model");
const validation_1 = require("../validation/validation");
const user_validation_1 = require("../validation/user-validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            const totalUserWithSameUserName = yield database_1.prismaClient.user.count({
                where: {
                    username: registerRequest.username,
                }
            });
            if (totalUserWithSameUserName != 0) {
                throw new response_error_1.ResponseError(400, "Username telah terdaftar");
            }
            registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 10);
            yield database_1.prismaClient.user.create({
                data: registerRequest
            });
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            const user = yield database_1.prismaClient.user.findUnique({
                where: { username: loginRequest.username }
            });
            if (!user || !(yield bcrypt_1.default.compare(loginRequest.password, user.password))) {
                throw new response_error_1.ResponseError(401, "Username atau password salah");
            }
            const userPayload = { username: user.username };
            const accessToken = (0, auth_middleware_1.issueAccessToken)(userPayload);
            const refreshToken = (0, auth_middleware_1.issueRefreshToken)(userPayload);
            const userToken = yield database_1.prismaClient.user.update({
                where: {
                    username: user.username
                },
                data: {
                    refresh_token: refreshToken
                }
            });
            return (0, user_model_1.toLoginResponse)(accessToken, userToken);
        });
    }
    static refreshAccessToken(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestRefreshToken = validation_1.Validation.validate(user_validation_1.UserValidation.REFRESH, request);
            if (!requestRefreshToken) {
                throw new response_error_1.ResponseError(401, "Refresh token tidak tersedia");
            }
            const decoded = jsonwebtoken_1.default.verify(requestRefreshToken.refresh_token, jwt_1.jwtRefresh.secret);
            const user = yield database_1.prismaClient.user.findUnique({ where: { username: decoded.username } });
            if (!user || user.refresh_token !== requestRefreshToken.refresh_token) {
                throw new response_error_1.ResponseError(403, "Refresh token tidak valid");
            }
            const userPayload = { username: decoded.username };
            const accessToken = (0, auth_middleware_1.issueAccessToken)(userPayload);
            return (0, user_model_1.toUserRefreshAccessToken)(accessToken);
        });
    }
    static logout(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.user.update({
                where: {
                    username: request
                },
                data: {
                    refresh_token: null
                }
            });
        });
    }
}
exports.UserService = UserService;
