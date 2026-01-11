import { eventModel } from "../models/events.model.js";

export const browseAiWebhook = async (req, res) => {
  try {
    const payload = req.body;

    // Browse AI sends data like this:
    // payload.data or payload.items (depends on config)
    const events = payload.data || payload.items || [];

    if (!Array.isArray(events)) {
      return res.status(400).json({ message: "Invalid webhook payload" });
    }

    let saved = 0;
    let skipped = 0;

    for (const item of events) {
      const {
        title,
        venue,
        dateOfEvent,
        endDate,
        description,
        eventUrl,
        imageUrl,
      } = item;

      if (!title || !dateOfEvent) {
        skipped++;
        continue;
      }

      const parsedDate = new Date(dateOfEvent);

      const existing = await eventModel.findOne({
        title,
        dateOfEvent: parsedDate,
      });

      if (existing) {
        skipped++;
        continue;
      }

      await eventModel.create({
        title,
        venue,
        dateOfEvent: parsedDate,
        description,
        eventUrl,
        imageUrl,
      });

      saved++;
    }

    return res.status(200).json({
      success: true,
      message: "Webhook processed",
      saved,
      skipped,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ success: false });
  }
};
