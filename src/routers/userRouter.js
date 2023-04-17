import express from "express";
import { logout } from "../controllers/userController";
const userRouter = express();

userRouter.get("/logout", logout);
export default userRouter;
