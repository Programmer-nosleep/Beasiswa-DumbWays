import { Router } from "express";
import { healthCheck } from "../controller/health.controller";

export const healthRouter = Router();

healthRouter.get("/health", healthCheck);

