import express from "express";
import { top, playlists, getAddSong, postAddSong } from "../controllers/musicController";
import { protectorMiddleware } from "../middlewares";
const musicRouter = express.Router();

musicRouter.get("/top", protectorMiddleware, top);
musicRouter.get("/playlist", protectorMiddleware, playlists);
musicRouter.route("/addsong").all(protectorMiddleware).get(getAddSong).post(postAddSong);
export default musicRouter;
