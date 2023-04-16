import express from "express";
import { home } from "../controllers/homeController";
import { getLogin, postLogin, getJoin, postJoin } from "../controllers/userController";
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
export default rootRouter;
