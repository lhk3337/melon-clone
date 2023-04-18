import express from "express";
import { addplaylist, addListnersCount } from "../controllers/musicController";
import { protectorMiddleware } from "../middlewares";
const apiRouter = express.Router();

apiRouter.post("/music/:id/views", protectorMiddleware, addListnersCount);
apiRouter.post("/music/:id/addplaylist", protectorMiddleware, addplaylist);
export default apiRouter;
