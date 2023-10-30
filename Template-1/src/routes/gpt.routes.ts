import { Router } from "express";
import { createAssessment } from "../controllers/gpt.controller";

const gptRouter = Router();

gptRouter.post("/create-assessment", createAssessment);

export default gptRouter;
