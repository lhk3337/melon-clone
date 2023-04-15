import express from "express";
import { top, lists, playadd } from "../controllers/musicController";

const musicRouter = express.Router();

musicRouter.get("/top", top);
musicRouter.get("/playlist", lists);
musicRouter.get("/:id/playadd", playadd);
export default musicRouter;
