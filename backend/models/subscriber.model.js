import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    otp: { type: Number },
    otpExpiresAt: { type: Date },
    optIn: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const subscriberModel = mongoose.model("Subscribers", subscriberSchema);
