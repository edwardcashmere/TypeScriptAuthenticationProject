import { DocumentDefinition, FilterQuery} from "mongoose";
import logger from "../utils/logger";
import {omit} from "lodash";
import UserModel,{ UserDocument } from "../models/user.model";

export const createUser  = async (body: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword" > >)=>{

    try {
        const user= await UserModel.create(body);
        return omit(user.toJSON(),"password")

    } catch (error: any) {
        throw new Error(error)
    }


}

export const validatePassword = async ({email, password}: {email: string, password: string})=>{
    try {
        const user  = await UserModel.findOne({email})
        if(!user) return false;

        const valid = user.comparePassword(password)
        if(!valid) return false;

        return omit(user.toJSON(), "password")
    } catch (error:any) {
        
    }

}


export const findUser = async (query: FilterQuery<UserDocument>)=>{

    try {
        const user =await UserModel.findOne(query)

        return user.toJSON();
    
    } catch (error:any) {
        
    }


}



