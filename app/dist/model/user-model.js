"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLoginResponse = toLoginResponse;
exports.toUserRefreshAccessToken = toUserRefreshAccessToken;
function toLoginResponse(accessToken, user) {
    return {
        access_token: accessToken,
        refresh_token: user.refresh_token
    };
}
function toUserRefreshAccessToken(accessToken) {
    return {
        access_token: accessToken,
    };
}
