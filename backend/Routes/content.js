import express from "express";
import Content from "../Models/content.js";
import { protect } from "../middlewares/auth.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/* ---------------- MULTER (memory) ---------------- */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/* ---------------- GET CONTENT ---------------- */
router.get("/", async (req, res) => {
  try {
    const content = await Content.findOne().select(
      "-_id name title description years terms roles image",
    );
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------- CREATE (ONCE) ---------------- */
router.post("/", protect, async (req, res) => {
  try {
    const existing = await Content.findOne();
    if (existing) {
      return res.status(400).json({ message: "Content already exists" });
    }

    const content = await Content.create(req.body);
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------- UPDATE + IMAGE UPLOAD ---------------- */
router.put("/", protect, upload.single("image"), async (req, res) => {
  try {
    const data = req.body;

    /* ---------- upload image if exists ---------- */
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "content", // optional but clean
        },
      );

      data.image = uploadResult.secure_url;
    }

    const updated = await Content.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------- PATCH (NO IMAGE) ---------------- */
router.patch("/", protect, async (req, res) => {
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
});

export default router;
