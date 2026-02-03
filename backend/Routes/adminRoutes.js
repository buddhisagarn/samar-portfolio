import express from "express";
import {
  getSubscribers,
  deleteSubscriber,
  sendBulkEmail,
} from "../Controllers/adminController.js";

const router = express.Router();

router.get("/subscribers", getSubscribers);
router.delete("/subscribers/:id", deleteSubscriber);
router.post("/send-email", sendBulkEmail);

export default router;
