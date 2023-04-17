import express from "express";
import { top, lists } from "../controllers/musicController";
import { protectorMiddleware } from "../middlewares";
const musicRouter = express.Router();

musicRouter.get("/top", protectorMiddleware, top);
musicRouter.get("/playlist", protectorMiddleware, lists);
export default musicRouter;
