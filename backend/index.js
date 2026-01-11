import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/connectDb.js";
import { EventRouter } from "./routes/events.routes.js";
import { SubscribeRouter } from "./routes/subscriber.routes.js";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is up and running");
});

app.use("/api", EventRouter);
app.use("/api", SubscribeRouter);

connectDB();
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
