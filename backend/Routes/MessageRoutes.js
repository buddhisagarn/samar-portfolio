import express from "express";
import {
  sendMessage,
  getAllMessages,
  deleteMessage,
  markAsRead,
  messageInfoo,
  getMessageInfoo,
  putMessageInfoo,
} from "../Controllers/messageControllers.js";
// import { protectAdmin } from "../middleware/authMiddleware.js";
//  use your existing admin middleware

const router = express.Router();

// public (frontend)
router.post("/", sendMessage);

// admin only
router.get("/", getAllMessages);
router.put("/:id/read", markAsRead);
router.delete("/:id", deleteMessage);

// This is for message info
router.post("/messageinfo", messageInfoo);
router.get("/messageinfo", getMessageInfoo);
router.put("/messageinfo", putMessageInfoo);

export default router;
