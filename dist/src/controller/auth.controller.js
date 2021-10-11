"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = void 0;
const auth_service_1 = require("../service/auth.service");
const logger_1 = __importDefault(require("../utils/logger"));
const createUserHandler = async (req, res) => {
    try {
        const user = await (0, auth_service_1.createUser)(req.body);
        return res.status(200).json(user);
    }
    catch (error) {
        logger_1.default.error(error.message);
        return res.status(409).json({ message: "something went wrong" });
    }
};
exports.createUserHandler = createUserHandler;
