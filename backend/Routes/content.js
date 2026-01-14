import express from "express";
import Content from "../Models/content.js";
import { protect } from "../middlewares/auth.js";
import multer from "multer";
import cloudinary from "cloudinary";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

router.get("/", async (req, res) => {
  const content = await Content.findOne();
  res.json(content);
});

router.put("/", protect, upload.single("image"), async (req, res) => {
  const data = req.body;

  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    data.image = result.secure_url;
  }

  const updated = await Content.findOneAndUpdate({}, data, {
    new: true,
    upsert: true,
  });

  res.json(updated);
});

export default router;
