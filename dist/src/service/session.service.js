"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reIssueTokens = exports.deleteSession = exports.getSession = exports.createSession = void 0;
const session_model_1 = __importDefault(require("../models/session.model"));
const jwt_utils_1 = require("../utils/jwt.utils");
const lodash_1 = require("lodash");
const auth_service_1 = require("./auth.service");
const config_1 = __importDefault(require("config"));
const createSession = async (userId, userAgent) => {
    try {
        const session = await session_model_1.default.create({ user: userId, userAgent });
        return session.toJSON();
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.createSession = createSession;
const getSession = async (query) => {
    return await session_model_1.default.find(query).lean();
};
exports.getSession = getSession;
const deleteSession = async (query, update) => {
    return await session_model_1.default.updateOne(query, update);
};
exports.deleteSession = deleteSession;
const reIssueTokens = async ({ refreshToken }) => {
    const { decoded } = (0, jwt_utils_1.verifyJwt)(refreshToken);
    if (!decoded || !(0, lodash_1.get)(decoded, "session"))
        return false;
    const session = await session_model_1.default.findById((0, lodash_1.get)(decoded, "session")).lean();
    if (!session || !session.valid)
        return false;
    const user = await (0, auth_service_1.findUser)({ _id: session.user });
    console.log("refresh", user);
    if (!user) {
        return false;
    }
    const accessToken = (0, jwt_utils_1.signJwt)({ ...user, session: session._id }, { expiresIn: config_1.default.get("accessTokenTtl") });
    const refeshToken = (0, jwt_utils_1.signJwt)({ ...user, session: session._id }, { expiresIn: config_1.default.get("refreshTokenTtl") });
    return { accessToken, refeshToken };
};
exports.reIssueTokens = reIssueTokens;
