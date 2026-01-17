import { subscriberModel } from "../models/subscriber.model.js";
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }
  try {
    const subscriber = await subscriberModel.findOne({ email });
    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    // Check if OTP has expired
    if (subscriber.otpExpiresAt && new Date() > subscriber.otpExpiresAt) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (subscriber.otp !== parseInt(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    subscriber.optIn = true;
    subscriber.otp = null; // Clear OTP after verification
    subscriber.otpExpiresAt = null;
    await subscriber.save();
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error verifying OTP" });
    console.log("error verifying otp", error);
  }
};
