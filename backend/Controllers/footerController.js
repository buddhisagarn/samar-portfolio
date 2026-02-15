import About from "../Models/footer.js";

/* GET ABOUT CONTENT */
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ message: "Failed to load about data" });
  }
};

/* UPDATE ABOUT CONTENT (ADMIN) */
export const updateAbout = async (req, res) => {
  try {
    const updated = await About.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
