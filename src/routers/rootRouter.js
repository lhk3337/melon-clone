import express from "express";
import { home, posthome } from "../controllers/songController";

const rootRouter = express.Router();

rootRouter.get("/", home);
export default rootRouter;
