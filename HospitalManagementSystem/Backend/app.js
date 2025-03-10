import express from "express";
import {config} from 'dotenv'
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./Database/dbConnection.js";
import messageRouter from "./router/messageRouter.js"
import {eroorMiddleware} from './middlewares/errorMiddleware.js'
import userRouter from './router/userRouter.js'
import appointmentRouter from './router/appointmentRouter.js'
import path from 'path';

const app = express();
config({path:"./config/config.env"});
app.use(cors({
    origin:[process.env.FRONTEND_URI, process.env.DASHBOARD_URI],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment",appointmentRouter)
dbConnection();



// Serve static files from the public folder
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads'))); 

app.use(eroorMiddleware)

export default app;