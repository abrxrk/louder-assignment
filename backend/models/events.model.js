import mongoose from "mongoose";

const { Schema } = mongoose

const eventSchema = new Schema({
  
})


export const eventModel = mongoose.model("Events" , eventSchema)
