import { Router, Request, Response, NextFunction } from "express";
import {createUserHandler} from "../controller/auth.controller";
import validateRequest from "../middleware/validate";
import { createUserSchema } from "../utils/schema";
import { createSessionSchema } from "../utils/login.schema";
import requireUser from "../middleware/requireUser";
import { sessionHandler, getSessionHandler, deleteSessionHandler } from "../controller/session.controller";

const router = Router()


router.post('/register',validateRequest(createUserSchema),createUserHandler);
router.post('/login', validateRequest(createSessionSchema), sessionHandler);
router.get('/session', requireUser,getSessionHandler);
router.delete('/session', requireUser, deleteSessionHandler);











export default router;