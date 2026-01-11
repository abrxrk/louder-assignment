import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriberSchema = new Schema(
  {
    email: String,
    optIn: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const subscriberModel = mongoose.model("Subscribers", subscriberSchema);
