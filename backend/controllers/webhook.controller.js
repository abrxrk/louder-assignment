import { eventModel } from "../models/events.model.js";

export const browseAiWebhook = async (req, res) => {
  try {
    console.log("Browse AI Webhook Hit");

    const payload = req.body;
    console.log("Full payload keys:", Object.keys(payload || {}));

    // Accept common shapes: data.items (Browse AI), items, events, or raw array
    const events =
      payload?.task?.capturedLists?.["Sydney Events"] ||
      payload?.capturedLists?.["Sydney Events"] ||
      payload?.data?.items ||
      payload?.items ||
      (Array.isArray(payload) ? payload : null);

    if (!Array.isArray(events)) {
      console.error("No events array found");
      return res.status(400).json({ message: "No events array found" });
    }

    const parseDayMonth = (value) => {
      if (!value) return null;
      const year = new Date().getFullYear();
      const parsed = new Date(`${value} ${year}`);
      return isNaN(parsed) ? null : parsed;
    };

    let saved = 0;
    let skipped = 0;

    for (const item of events) {
      const title = item?.title?.trim();
      const venue = item?.venue?.trim();
      const dateOfEventRaw = item?.dateOfEvent || item?.date || item?.startDate;
      const endDateRaw = item?.endDate;
      const eventUrl = item?.eventUrl;
      const imageUrl = item?.imageUrl;
      const description = item?.Description || item?.description;
      const imageDescription =
        item?.["Image Description"] || item?.imageDescription;
      const position = item?.Position || item?.position;
      const status = item?._STATUS || item?.status;

      if (!title || !dateOfEventRaw) {
        skipped++;
        continue;
      }

      const parsedDate = parseDayMonth(dateOfEventRaw);
      if (!parsedDate) {
        console.warn("Invalid date:", dateOfEventRaw);
        skipped++;
        continue;
      }

      const parsedEndDate = endDateRaw ? parseDayMonth(endDateRaw) : null;

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
        endDate: parsedEndDate,
        eventUrl,
        imageUrl,
        description,
        imageDescription,
        position,
        status,
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
    console.error("Webhook error:", error);
    res.status(500).json({ success: false });
  }
};
