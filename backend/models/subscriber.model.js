import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    optIn: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const subscriberModel = mongoose.model("Subscribers", subscriberSchema);
