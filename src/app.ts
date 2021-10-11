import express from "express";
import config from "config";
import connectDB  from "../config/db";
import logger from "./utils/logger";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>("port")  || 9000

const app = express();

//connect dataabse
connectDB()


//connect routes: 
app.use(express.json())
app.use(morgan("common"))
app.use(deserializeUser)
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);



app.listen(port, ()=>{
    logger.info(`server running http://localhost:${port} `)
})