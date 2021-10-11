import { Router, Request, Response, NextFunction } from "express";
import validateRequest from "../middleware/validate";
import { createProductSchema, updateProductSchema, deleteProductSchema, getProductSchema } from "../utils/product.schema";
import requireUser from "../middleware/requireUser";
import { createProductHandler, getProductHandler, updateProductHandler, deleteProductHandler } from "../controller/product.controller";

const router = Router()


router.get('/:productId',[requireUser,validateRequest(getProductSchema)], getProductHandler);
router.post('/', [requireUser,validateRequest(createProductSchema)], createProductHandler);
router.put('/:productId', [requireUser, validateRequest(updateProductSchema)], updateProductHandler);
router.delete('/:productId', [requireUser, validateRequest(deleteProductSchema)], deleteProductHandler);











export default router;