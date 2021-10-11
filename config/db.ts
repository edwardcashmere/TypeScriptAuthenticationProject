import mongoose, { ConnectOptions } from "mongoose";
import config from "config";
import logger from "../src/utils/logger";

const uri = config.get<string>('URI')

const connectDB = async()=>{
    try {
        const conn =await  mongoose.connect(uri, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
}as ConnectOptions)
        logger.info(`mongoDB connection runn9ng to ${conn.connection.host}`)
    
    } catch (error:any) {
        logger.error(`${error.message}}`)
        process.exit(1)
        
    }

}

export default connectDB;