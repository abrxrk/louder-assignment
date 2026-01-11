import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/connectDb.js";


const app = express();
dotenv.config();
app.use(express.json());

app.get("/", () => {
  res.send("Backend is up and running");
});


connectDB()
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
