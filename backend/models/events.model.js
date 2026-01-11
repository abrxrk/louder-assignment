import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: String,
    category: String,
    venue: String,
    dateOfEvent: Date,
    eventUrl: String,
    imageUrl: String,
    description: String,
  },
  { timestamps: true }
);


export const eventModel = mongoose.model("Events", eventSchema);
