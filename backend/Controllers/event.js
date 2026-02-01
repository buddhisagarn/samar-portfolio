import Event from "../Models/events.js";

/* ➕ Create */
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      tags: req.body.tags?.split(",").map((t) => t.trim()),
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* 📥 Read */
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ✏️ Update */
export const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        tags: req.body.tags?.split(",").map((t) => t.trim()),
      },
      { new: true, runValidators: true },
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* 🗑 Delete */
export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
