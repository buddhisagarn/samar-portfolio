import express from "express";
import { getBooks, createBook } from "../controllers/book.js";
import { updateBook } from "../controllers/book.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);
router.put("/:id", updateBook);

export default router;
