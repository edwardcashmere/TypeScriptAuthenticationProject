import { get } from "lodash";
import { verifyJwt } from '../utils/jwt.utils';
import {Request, Response, NextFunction} from "express";
import {reIssueTokens } from "../service/session.service";


const deserializeUser = async (req: Request, res: Response, next: NextFunction) =>{

    const accessToken  = get (req, "headers.authorization", "").replace(/^Bearer\s/, "");

    const refreshToken = get(req, "headers.x-refresh");

    if(!accessToken){
        return next()
    }
    
    const {decoded, expired } = verifyJwt(accessToken);

    if(decoded){
        console.log("decoded",decoded)
        res.locals.user = decoded
      return  next()
    }

    if(expired && refreshToken){
        const tokens = await reIssueTokens({refreshToken})

        if(tokens){
            res.setHeader('x-access-token', tokens.accessToken)
            res.setHeader('x-refresh', tokens.refeshToken);

            const result = verifyJwt(tokens.accessToken);

            res.locals.user = result.decoded

            return next()


        }


    }

    return next()

}

export default deserializeUser