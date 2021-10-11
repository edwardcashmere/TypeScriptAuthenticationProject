"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const publicKey = config_1.default.get("publicKey");
const privateKey = config_1.default.get("privateKey");
const signJwt = (object, options) => {
    return jsonwebtoken_1.default.sign(object, privateKey, { ...(options && options), algorithm: 'RS256' });
};
exports.signJwt = signJwt;
const verifyJwt = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return {
            valid: true,
            decoded,
            expired: false
        };
    }
    catch (error) {
        return {
            valid: false,
            decoded: null,
            expired: error.message === 'jwt expired'
        };
    }
};
exports.verifyJwt = verifyJwt;
