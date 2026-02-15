import express from "express";
import { getAbout, updateAbout } from "../Controllers/footerController.js";

const router = express.Router();

router.get("/", getAbout);
router.put("/", updateAbout); // admin only

export default router;
