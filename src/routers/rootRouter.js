import express from "express";
import { publicOnlyMiddleware, protectorMiddleware } from "../middlewares";
import { home } from "../controllers/homeController";
import { getLogin, postLogin, getJoin, postJoin } from "../controllers/userController";
const rootRouter = express.Router();

rootRouter.get("/", protectorMiddleware, home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
export default rootRouter;
