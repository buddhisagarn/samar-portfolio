import {
  aboutSection,
  getaboutSection,
  deleteAboutSection,
} from "../Controllers/aboutControllers.js";
import express from "express";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), aboutSection);
router.get("/", getaboutSection);
router.delete("/:aboutid/skill/:skillid", deleteAboutSection);

export default router;
