import express from "express";
import { addplaylist } from "../controllers/musicController";
import { protectorMiddleware } from "../middlewares";
const apiRouter = express.Router();

apiRouter.post("/music/:id/addplaylist", protectorMiddleware, addplaylist);
export default apiRouter;
