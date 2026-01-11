import express from "express";
import { browseAiWebhook } from "../controllers/webhook.controller.js";

export const webHookRoute = express.Router();

webHookRoute.post("/browse-ai", browseAiWebhook);


