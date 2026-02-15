import express from "express";
import {
  getReadBooks,
  addReadBook,
  updateReadBook,
  deleteReadBook,
} from "../Controllers/book.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getReadBooks);
router.post("/", upload.single("book"), addReadBook);
router.put("/:id", upload.single("book"), updateReadBook);
router.delete("/:id", deleteReadBook);

export default router;
