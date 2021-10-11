"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const jwt_utils_1 = require("../utils/jwt.utils");
const session_service_1 = require("../service/session.service");
const deserializeUser = async (req, res, next) => {
    const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = (0, lodash_1.get)(req, "headers.x-refresh");
    if (!accessToken) {
        return next();
    }
    const { decoded, expired } = (0, jwt_utils_1.verifyJwt)(accessToken);
    if (decoded) {
        console.log("decoded", decoded);
        res.locals.user = decoded;
        return next();
    }
    if (expired && refreshToken) {
        const tokens = await (0, session_service_1.reIssueTokens)({ refreshToken });
        if (tokens) {
            res.setHeader('x-access-token', tokens.accessToken);
            res.setHeader('x-refresh', tokens.refeshToken);
            const result = (0, jwt_utils_1.verifyJwt)(tokens.accessToken);
            res.locals.user = result.decoded;
            return next();
        }
    }
    return next();
};
exports.default = deserializeUser;
