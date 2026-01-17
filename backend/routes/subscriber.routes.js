import express from "express"
import { addSubscriber } from "../controllers/subscriber.controller.js"
import { sendEmail } from "../controllers/email.controller.js"
import { verifyOtp } from "../controllers/otpVerify.controller.js"

export const SubscribeRouter = express.Router()

SubscribeRouter.post('/subscribe', addSubscriber)
SubscribeRouter.post('/send-otp' , sendEmail)
SubscribeRouter.post('/verify-otp' , verifyOtp)

