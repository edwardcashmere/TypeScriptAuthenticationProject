"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const createProduct = async (input) => {
    return await product_model_1.default.create(input);
};
exports.createProduct = createProduct;
const getProduct = async (query, options = { lean: true }) => {
    return await product_model_1.default.findOne(query, {}, options);
};
exports.getProduct = getProduct;
const updateProduct = async (query, update, options) => {
    return await product_model_1.default.findOneAndUpdate(query, update, options);
};
exports.updateProduct = updateProduct;
const deleteProduct = async (query) => {
    return await product_model_1.default.deleteOne(query);
};
exports.deleteProduct = deleteProduct;
