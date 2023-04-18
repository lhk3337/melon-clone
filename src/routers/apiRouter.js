import express from "express";
import { addplaylist, delplaylist, addListnersCount } from "../controllers/musicController";
import { protectorMiddleware } from "../middlewares";
const apiRouter = express.Router();

apiRouter.post("/music/:id/views", protectorMiddleware, addListnersCount);
apiRouter.post("/music/:id/addplaylist", protectorMiddleware, addplaylist);
apiRouter.post("/music/:id/delplaylist", protectorMiddleware, delplaylist);
export default apiRouter;
