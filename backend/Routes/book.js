import express from "express";
import { getBooks, createBook, updateBook } from "../Controllers/book.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);
router.put("/:id", updateBook);

export default router;
