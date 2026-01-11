import { eventModel } from "../models/events.model.js";

export const browseAiWebhook = async (req, res) => {
  try {
    // 🔍 DEBUG LOGS (keep for now, remove later if you want)
    console.log("🔥 Browse AI Webhook Hit");
    console.log("Payload:", JSON.stringify(req.body, null, 2));

    const payload = req.body;

    /**
     * Browse AI sends data in this structure:
     * payload.table.rows = [ { event fields... } ]
     */
    const events = payload?.table?.rows;

    if (!Array.isArray(events)) {
      console.error("❌ Invalid payload structure");
      return res.status(400).json({
        success: false,
        message: "Invalid Browse AI webhook payload",
      });
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

      // Required fields check
      if (!title || !dateOfEvent) {
        skipped++;
        continue;
      }

      // Parse date safely
      const parsedDate = new Date(dateOfEvent);
      if (isNaN(parsedDate)) {
        skipped++;
        continue;
      }

      // Prevent duplicates
      const existing = await eventModel.findOne({
        title,
        dateOfEvent: parsedDate,
      });

      if (existing) {
        skipped++;
        continue;
      }

      // Save event
      await eventModel.create({
        title,
        venue,
        dateOfEvent: parsedDate,
        endDate,
        description,
        eventUrl,
        imageUrl,
      });

      saved++;
    }

    return res.status(200).json({
      success: true,
      message: "Browse AI webhook processed successfully",
      saved,
      skipped,
      total: events.length,
    });
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
