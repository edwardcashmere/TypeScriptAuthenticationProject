import { AnyZodObject } from "zod";
import {Request, Response, NextFunction} from "express";
import logger from "../utils/logger";
const validate  =(schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) =>{

    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next()
    } catch (error: any) {
        logger.error(error.message);
        return res.status(400).json({message: error.message});

        
    }
}

export default validate;