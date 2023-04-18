import express from "express";
import { addplaylist, delplaylist, addListnersCount, musicinfo } from "../controllers/musicController";
import { protectorMiddleware } from "../middlewares";
const apiRouter = express.Router();

apiRouter.get("/music/:id", protectorMiddleware, musicinfo);
apiRouter.post("/music/:id/views", protectorMiddleware, addListnersCount);
apiRouter.post("/music/:id/addplaylist", protectorMiddleware, addplaylist);
apiRouter.post("/music/:id/delplaylist", protectorMiddleware, delplaylist);
export default apiRouter;
