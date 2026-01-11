import { eventModel } from "../models/events.model.js";

export const browseAiWebhook = async (req, res) => {
  try {
    console.log("Browse AI Webhook Hit");

    const payload = req.body;
    console.log("Full payload keys:", Object.keys(payload));

    // Browse AI actual structure
    const events = payload?.data?.items;

    if (!Array.isArray(events)) {
      console.error("❌ No events array found");
      return res.status(400).json({ message: "No events array found" });
    }

    let saved = 0;
    let skipped = 0;

    for (const item of events) {
      const {
        title,
        venue,
        dateOfEvent,
        eventUrl,
      } = item;

      if (!title || !dateOfEvent) {
        skipped++;
        continue;
      }

      // Proper date parsing
      const parsedDate = new Date(`${dateOfEvent} ${new Date().getFullYear()}`);
      if (isNaN(parsedDate)) {
        console.warn("Invalid date:", dateOfEvent);
        skipped++;
        continue;
      }

      const exists = await eventModel.findOne({
        title,
        dateOfEvent: parsedDate,
      });

      if (exists) {
        skipped++;
        continue;
      }

      await eventModel.create({
        title,
        venue,
        dateOfEvent: parsedDate,
        eventUrl,
      });

      saved++;
    }

    console.log(`Inserted ${saved} events`);

    return res.status(200).json({
      success: true,
      saved,
      skipped,
    });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    res.status(500).json({ success: false });
  }
};
