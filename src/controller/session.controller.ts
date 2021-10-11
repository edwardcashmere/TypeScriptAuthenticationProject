import {Request, Response} from "express";
import { createSession,getSession, deleteSession } from "../service/session.service";
import { validatePassword } from "../service/auth.service"
import { signJwt, verifyJwt} from "../utils/jwt.utils";
import config from "config";


export const sessionHandler =async (req: Request, res: Response)=>{

    // validate users password

    const user = await validatePassword(req.body);

    if(!user) return res.status(401).json({message: "Invalid email or password"})

    // create session
    const session = await createSession(user._id, req.get("user-agent") || "");



    // create acces token
    const accessToken = signJwt({...user, session: session._id}, {expiresIn: config.get<string>("accessTokenTtl")})

    const refreshToken = signJwt({...user, session: session._id}, {expiresIn: config.get<string>("refreshTokenTtl")})


    return res.status(201).json({accessToken, refreshToken});

    // create refresh token 

}

export const getSessionHandler = async(req: Request, res: Response)=>{
    const userId = res.locals.user._id
    const session =await getSession({user: userId, valid: true})

    return res.status(200).json(session)

}

export const deleteSessionHandler= async(req: Request, res: Response)=>{
    const session = res.locals.user.session;

    await deleteSession({_id: session}, {valid:false})

    return res.json({accessToken: null, refreshToken: null})

}