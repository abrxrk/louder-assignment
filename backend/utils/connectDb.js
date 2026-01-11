import mongoose from "mongoose";

export const connectDB = async () => {
  try { 
    await mongoose.connect(process.env.MONGO_URL)
    console.log("db connection successful")
  } catch (error) {
    console.log("error connecting to db", error)
    return
  }
}