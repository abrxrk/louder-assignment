import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./utils/connectDb.js";
import { EventRouter } from "./routes/events.routes.js";
import { SubscribeRouter } from "./routes/subscriber.routes.js";
import { webHookRoute } from "./routes/webhook.routes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is up and running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


app.use("/api", EventRouter);
app.use("/api", SubscribeRouter);
app.use("/api/webhooks", webHookRoute);

connectDB();
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
