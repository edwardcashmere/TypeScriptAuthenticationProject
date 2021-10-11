"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSessionHandler = exports.getSessionHandler = exports.sessionHandler = void 0;
const session_service_1 = require("../service/session.service");
const auth_service_1 = require("../service/auth.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const config_1 = __importDefault(require("config"));
const sessionHandler = async (req, res) => {
    // validate users password
    const user = await (0, auth_service_1.validatePassword)(req.body);
    if (!user)
        return res.status(401).json({ message: "Invalid email or password" });
    // create session
    const session = await (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
    // create acces token
    const accessToken = (0, jwt_utils_1.signJwt)({ ...user, session: session._id }, { expiresIn: config_1.default.get("accessTokenTtl") });
    const refreshToken = (0, jwt_utils_1.signJwt)({ ...user, session: session._id }, { expiresIn: config_1.default.get("refreshTokenTtl") });
    return res.status(201).json({ accessToken, refreshToken });
    // create refresh token 
};
exports.sessionHandler = sessionHandler;
const getSessionHandler = async (req, res) => {
    const userId = res.locals.user._id;
    const session = await (0, session_service_1.getSession)({ user: userId, valid: true });
    return res.status(200).json(session);
};
exports.getSessionHandler = getSessionHandler;
const deleteSessionHandler = async (req, res) => {
    const session = res.locals.user.session;
    await (0, session_service_1.deleteSession)({ _id: session }, { valid: false });
    return res.json({ accessToken: null, refreshToken: null });
};
exports.deleteSessionHandler = deleteSessionHandler;
