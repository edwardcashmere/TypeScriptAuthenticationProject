"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const db_1 = __importDefault(require("../config/db"));
const logger_1 = __importDefault(require("./utils/logger"));
const morgan_1 = __importDefault(require("morgan"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const deserializeUser_1 = __importDefault(require("./middleware/deserializeUser"));
const port = config_1.default.get("port") || 9000;
const app = (0, express_1.default)();
//connect dataabse
(0, db_1.default)();
//connect routes: 
app.use(express_1.default.json());
app.use((0, morgan_1.default)("common"));
app.use(deserializeUser_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/product", product_routes_1.default);
app.listen(port, () => {
    logger_1.default.info(`server running http://localhost:${port} `);
});
