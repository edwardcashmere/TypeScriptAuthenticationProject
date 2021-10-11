import Session,{SessionDocument} from "../models/session.model";
import  { FilterQuery,UpdateQuery } from "mongoose";
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { get } from "lodash";
import { findUser } from "./auth.service";
import config  from "config";

export const createSession =async (userId: string, userAgent: string)=>{

    try {
        const session = await Session.create({user: userId, userAgent})  
        return session.toJSON()

    } catch (error: any) {
        throw new Error(error)
    }

}

export const getSession = async(query: FilterQuery<SessionDocument>)=>{

    return await Session.find(query).lean();
}

export const deleteSession = async(query: FilterQuery<SessionDocument>, update:UpdateQuery<SessionDocument>)=>{

    return await Session.updateOne(query, update);

}

export const reIssueTokens = async({refreshToken}:{refreshToken: string})=>{

    const {decoded} = verifyJwt(refreshToken)

    if(!decoded || !get(decoded, "session")) return false;


    const session = await Session.findById(get(decoded, "session")).lean();

    if(!session || !session.valid) return false

    const user = await findUser({_id: session.user})
    console.log("refresh",user)
    if(!user){
        return false
    }

    const accessToken = signJwt({...user, session: session._id}, {expiresIn: config.get<string>("accessTokenTtl")});
    const refeshToken = signJwt({...user, session: session._id}, {expiresIn: config.get<string>("refreshTokenTtl")});

    return {accessToken, refeshToken}










}
