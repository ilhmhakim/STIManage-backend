import {User} from "@prisma/client";

export type UserRegisterRequest = {
    username: string;
    password: string;
}

export type UserLoginRequest = {
    username: string;
    password: string;
}

export type UserLoginResponse = {
    access_token: string;
    refresh_token: string;
}

export type RefreshAccessTokenRequest = {
    refresh_token: string
}

export function toLoginResponse(accessToken: string, user: User): UserLoginResponse {
    return {
        access_token: accessToken,
        refresh_token: user.refresh_token!
    }
}

export function toUserRefreshAccessToken(accessToken: string) {
    return {
        access_token: accessToken,
    }
}