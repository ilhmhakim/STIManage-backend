import {toLoginResponse, UserLoginRequest, UserRegisterRequest} from "../model/user-model";
import {Validation} from "../validation/validation";
import {UserValidation} from "../validation/user-validation";
import {prismaClient} from "../application/database";
import {ResponseError} from "../error/response-error";
import bcrypt from "bcrypt";
import {UserPayload} from "../type/user";
import {issueAccessToken, issueRefreshToken} from "../middleware/auth-middleware";


export class UserService {
    static async register(request: UserRegisterRequest) {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const totalUserWithSameUserName = await prismaClient.user.count({
            where: {
                username: registerRequest.username,
            }
        });

        if (totalUserWithSameUserName != 0) {
            throw new ResponseError(400, "Username telah terdaftar")
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        await prismaClient.user.create({
           data: registerRequest
        });
    }

    static async login(request: UserLoginRequest) {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        const user = await prismaClient.user.findUnique({
            where: { username: loginRequest.username }
        });

        if (!user || !(await bcrypt.compare(loginRequest.password, user.password))) {
            throw new ResponseError(401, "Username atau password salah");
        }

        const userPayload: UserPayload = { username: user.username };
        const accessToken = issueAccessToken(userPayload);
        const refreshToken = issueRefreshToken(userPayload);

        const userToken = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: {
                refresh_token: refreshToken
            }
        });

        return toLoginResponse(accessToken, userToken);
    }
}