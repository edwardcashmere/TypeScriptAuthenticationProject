import jwt from "jsonwebtoken";
import config from "config";

const publicKey = config.get<string>("publicKey");
const privateKey = config.get<string>("privateKey");

export const signJwt =  (object: Object, options?: jwt.SignOptions | undefined) =>{
return jwt.sign(object, privateKey, { ...(options && options),algorithm: 'RS256'})
}

export const verifyJwt = (token: string) => {

    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            decoded,
            expired: false 
        }
    } catch (error: any) {

        return {
            valid: false,
            decoded: null,
            expired: error.message === 'jwt expired' 
        }
        
    }

}