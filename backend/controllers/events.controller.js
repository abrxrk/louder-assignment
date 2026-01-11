import { eventModel } from "../models/events.model.js";

export const getEventsController = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let scrapedEvents = await eventModel
      .find({ dateOfEvent: { $gte: today } })
      .sort({ dateOfEvent: 1 }); //events come from todays date
    // if there are 0 latest events , fetch old events for better UI/UX exp for user
    if (scrapedEvents.length === 0) {
      scrapedEvents = await eventModel
        .find({ dateOfEvent: { $lt: today } })
        .sort({ dateOfEvent: -1 });
    }
    res.status(200).json({
      success: true,
      count: scrapedEvents.length,
      data: scrapedEvents,
    });
  } catch (error) {
    console.log("error fetching scraped events", error);
    res.status(500).json({
      success: false,
      message: "error fetching scraped events",
    });
  }
};
