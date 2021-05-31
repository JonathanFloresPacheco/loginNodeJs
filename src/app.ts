import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { mainRouter } from "./main/main.router";
export const app: Application = express();
const startupdebug = require('debug')('app:startup');
import { DBURL, JWT_SECRET } from "./config/env";
import jwt from "express-jwt";
import mongoose from 'mongoose'
import { Handlers } from "./helpers/handlers";
import { envelope } from "./helpers/envelope";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.set('view engine', 'ejs');
app.use(cors());
app.options("http://localhost:4200", cors());

mongoose.set('useCreateIndex', true);
mongoose.connect(DBURL,{useNewUrlParser: true, useUnifiedTopology: true})
.then((conn)=>{
    console.log('Conexion con Base de datos')
}).catch(err=> console.error('Conexion con error',err));

app.use("/", jwt({ secret: JWT_SECRET, algorithms: ["HS256"] }).unless({
    path: [
      "/users/adduser/",
      "/users/login/",
    ]
  }),
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err.name === "UnauthorizedError") {
        const resError = Handlers.errorHandler({ error: "Unauthorized." }, "UNAUTHORIZED");
        res.status(resError.code).json(envelope(resError.data));
        return err;
      }
      next();
    },
  );  
app.use("/", mainRouter);
