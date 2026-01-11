import express from "express"
import { getEventsController } from "../controllers/events.controller.js"

export const EventRouter = express.Router()

EventRouter.get('/events' , getEventsController)