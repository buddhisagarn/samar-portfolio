import {
  aboutSection,
  getaboutSection,
} from "../Controllers/aboutControllers.js";
import express from "express";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), aboutSection);
router.get("/", getaboutSection);

export default router;
