import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriberSchema = new Schema({});

export const subscriberModel = mongoose.model("Subscribers", subscriberSchema);
