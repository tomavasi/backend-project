import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {userRouter} from "./routes/users.js";
import { authRouter } from "./routes/auth.js";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions.js";
import {connectDB} from "./config/connectDB.js"

const app = express();

const port = process.env.PORT

connectDB();
app.use(express.json());

app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/users", userRouter);
app.use("/auth", authRouter);

mongoose.connection.once("open", ()=>{
    console.log("Connected to MongoDB")
    app.listen(port, ()=>{
        console.log(`App is running on port:${port}`)
    });
})




