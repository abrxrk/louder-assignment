import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: String,
    category: String,
    venue: String,
    dateOfEvent: Date,
    endDate: Date,
    eventUrl: String,
    imageUrl: String,
    imageDescription: String,
    description: String,
    position: String,
    status: String,
  },
  { timestamps: true }
);

export const eventModel = mongoose.model("Events", eventSchema);
