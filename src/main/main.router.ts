import { Router } from "express";
import { usersRouter  } from "../users/users.router";

export const mainRouter = Router();
mainRouter
.use("/users", usersRouter)
;
