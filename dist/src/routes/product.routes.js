"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = __importDefault(require("../middleware/validate"));
const product_schema_1 = require("../utils/product.schema");
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const product_controller_1 = require("../controller/product.controller");
const router = (0, express_1.Router)();
router.get('/:productId', [requireUser_1.default, (0, validate_1.default)(product_schema_1.getProductSchema)], product_controller_1.getProductHandler);
router.post('/', [requireUser_1.default, (0, validate_1.default)(product_schema_1.createProductSchema)], product_controller_1.createProductHandler);
router.put('/:productId', [requireUser_1.default, (0, validate_1.default)(product_schema_1.updateProductSchema)], product_controller_1.updateProductHandler);
router.delete('/:productId', [requireUser_1.default, (0, validate_1.default)(product_schema_1.deleteProductSchema)], product_controller_1.deleteProductHandler);
exports.default = router;
