import express from "express"
import { addSubscriber } from "../controllers/subscriber.controller.js"

export const SubscribeRouter = express.Router()

SubscribeRouter.post('/subscribe', addSubscriber)

