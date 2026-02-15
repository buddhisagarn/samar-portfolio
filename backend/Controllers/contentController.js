import Content from "../Models/content.js";
import cloudinary from "../config/cloudinary.js";

export const getContent = async (req, res) => {
  try {
    const content = await Content.findOne().select(
      "-_id name title description years terms roles image journey",
    );

    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- CREATE (ONCE) ---------------- */
export const postContent = async (req, res) => {
  try {
    const existing = await Content.findOne();
    if (existing) {
      return res.status(400).json({ message: "Content already exists" });
    }

    const { name, title, description, years, terms, roles, image, journey } =
      req.body;

    // Extra safety check (optional but smart)
    if (journey && journey.length > 3) {
      return res
        .status(400)
        .json({ message: "Maximum 3 journey phases allowed" });
    }

    const content = await Content.create({
      name,
      title,
      description,
      years,
      terms,
      roles,
      image,
      journey,
    });

    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- UPDATE + IMAGE UPLOAD ---------------- */
export const putContent = async (req, res) => {
  try {
    const data = { ...req.body };

    // Parse JSON fields
    ["terms", "years"].forEach((field) => {
      if (data[field]) {
        data[field] = JSON.parse(data[field]);
      }
    });

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "content" },
      );

      data.image = uploadResult.secure_url;
    }

    const updated = await Content.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- PATCH (NO IMAGE) ---------------- */
export const patchContent = async (req, res) => {
  try {
    const updatedContent = await Content.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
    }).select("-_id -__v -createdAt -updatedAt");

    if (!updatedContent) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json(updatedContent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
