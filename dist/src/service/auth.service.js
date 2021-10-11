"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.validatePassword = exports.createUser = void 0;
const lodash_1 = require("lodash");
const user_model_1 = __importDefault(require("../models/user.model"));
const createUser = async (body) => {
    try {
        const user = await user_model_1.default.create(body);
        return (0, lodash_1.omit)(user.toJSON(), "password");
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.createUser = createUser;
const validatePassword = async ({ email, password }) => {
    try {
        const user = await user_model_1.default.findOne({ email });
        if (!user)
            return false;
        const valid = user.comparePassword(password);
        if (!valid)
            return false;
        return (0, lodash_1.omit)(user.toJSON(), "password");
    }
    catch (error) {
    }
};
exports.validatePassword = validatePassword;
const findUser = async (query) => {
    try {
        const user = await user_model_1.default.findOne(query);
        return user.toJSON();
    }
    catch (error) {
    }
};
exports.findUser = findUser;
