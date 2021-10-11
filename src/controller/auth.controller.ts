import { createUser } from "../service/auth.service";
import {Request, Response} from "express";
import logger from "../utils/logger";
import {CreateUserInput} from "../utils/schema";

export const createUserHandler =async (req: Request<{}, {}, CreateUserInput["body"]>, res: Response) =>{
    try {
        const user = await createUser(req.body);

        return res.status(200).json(user)

    } catch (error: any) {
        logger.error(error.message)
        return res.status(409).json({message: "something went wrong"})
        
    }
}