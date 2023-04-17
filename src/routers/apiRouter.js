import express from "express";
import { playadd } from "../controllers/musicController";
import { protectorMiddleware } from "../middlewares";
const apiRouter = express.Router();

apiRouter.post("/music/:id/playlist", protectorMiddleware, playadd);
export default apiRouter;
