import express from "express";
import { home, posthome } from "../controllers/songController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.post("/", posthome);
export default rootRouter;
