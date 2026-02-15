import express from "express";
import { protect } from "../middlewares/auth.js";
import multer from "multer";
import {
  getContent,
  postContent,
  putContent,
  patchContent,
} from "../Controllers/contentController.js";

const router = express.Router();

/* ---------------- MULTER (memory) ---------------- */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.get("/", getContent);
router.post("/", protect, postContent);
router.put("/", upload.single("image"), putContent);
router.patch("/", protect, patchContent);

export default router;
