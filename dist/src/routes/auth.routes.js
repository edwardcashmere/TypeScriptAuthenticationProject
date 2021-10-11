"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const validate_1 = __importDefault(require("../middleware/validate"));
const schema_1 = require("../utils/schema");
const login_schema_1 = require("../utils/login.schema");
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const session_controller_1 = require("../controller/session.controller");
const router = (0, express_1.Router)();
router.post('/register', (0, validate_1.default)(schema_1.createUserSchema), auth_controller_1.createUserHandler);
router.post('/login', (0, validate_1.default)(login_schema_1.createSessionSchema), session_controller_1.sessionHandler);
router.get('/session', requireUser_1.default, session_controller_1.getSessionHandler);
router.delete('/session', requireUser_1.default, session_controller_1.deleteSessionHandler);
exports.default = router;
