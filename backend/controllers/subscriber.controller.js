import { subscriberModel } from "../models/subscriber.model.js";

export const addSubscriber = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "email is required",
    });
  }
  try {
    const alreadySubscribed = await subscriberModel.findOne({email});
    if (alreadySubscribed) {
      return res.status(200).json({
        success: true,
        message: "email already subscribed",
      });
    }
    const subscribed = await subscriberModel.create({
      email: email,
      optIn: true,
    });
    res.status(200).json({
      success: true,
      message: "email service subscribed successfully",
    });
  } catch (error) {
    console.log("error subscribing to email service", error);
    res.status(500).json({
      success: false,
      message: "error subscribing to email service",
    });
  }
};
