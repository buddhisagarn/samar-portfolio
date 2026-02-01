import express from "express";
import {
  createNews,
  getAllNews,
  updateNews,
  deleteNews,
  increaseViews,
  getSingleArticle,
} from "../controllers/news.js";

const router = express.Router();

// Admin
router.post("/", createNews);
router.get("/", getAllNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);
router.get("/articles/:id", getSingleArticle);

// Public
router.patch("/:id/view", increaseViews);

export default router;
