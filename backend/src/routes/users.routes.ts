import express from "express";
import { ProfileUserController } from "../controllers/ProfileUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRouter = express.Router();

userRouter.get("/", ensureAuthenticated, new ProfileUserController().handle);

export default userRouter;
