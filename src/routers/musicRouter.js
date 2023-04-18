import express from "express";
import { top, playlists } from "../controllers/musicController";
import { protectorMiddleware } from "../middlewares";
const musicRouter = express.Router();

musicRouter.get("/top", protectorMiddleware, top);
musicRouter.get("/playlist", protectorMiddleware, playlists);
export default musicRouter;
