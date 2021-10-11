"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("../src/utils/logger"));
const uri = config_1.default.get('URI');
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger_1.default.info(`mongoDB connection runn9ng to ${conn.connection.host}`);
    }
    catch (error) {
        logger_1.default.error(`${error.message}}`);
        process.exit(1);
    }
};
exports.default = connectDB;
