"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductHandler = exports.updateProductHandler = exports.getProductHandler = exports.createProductHandler = void 0;
const product_service_1 = require("../service/product.service");
const createProductHandler = async (req, res) => {
    const userId = res.locals.user._id;
    const body = req.body;
    try {
        const product = await (0, product_service_1.createProduct)({ ...body, user: userId });
        return res.status(201).json(product.toJSON());
    }
    catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.createProductHandler = createProductHandler;
const getProductHandler = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await (0, product_service_1.getProduct)({ productId });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    }
    catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getProductHandler = getProductHandler;
const updateProductHandler = async (req, res) => {
    const update = req.body;
    const productId = req.params.productId;
    const userId = res.locals.user._id;
    try {
        const product = await (0, product_service_1.getProduct)({ productId });
        if (!product) {
            return res.status(404).json({ message: "product does not exist" });
        }
        if (String(product.user) !== userId) {
            return res.status(403).json({ message: "Forbidden to alter this Product" });
        }
        const newProduct = await (0, product_service_1.updateProduct)({ productId }, update, { new: true });
        return res.status(200).json(newProduct);
    }
    catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.updateProductHandler = updateProductHandler;
const deleteProductHandler = async (req, res) => {
    const productId = req.params.productId;
    const userId = res.locals.user._id;
    try {
        const product = await (0, product_service_1.getProduct)({ productId });
        if (!product) {
            return res.status(404).json({ message: "product does not exist" });
        }
        if (String(product.user) !== userId) {
            return res.status(403).json({ message: "Forbidden to alter this Product" });
        }
        await (0, product_service_1.deleteProduct)({ productId });
        return res.sendStatus(204);
    }
    catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.deleteProductHandler = deleteProductHandler;
