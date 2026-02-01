import News from "../Models/news.js";
import Article from "../Models/article.js";

/* ➕ Add News */
export const createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* 📥 Get All News (Admin) */
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ✏️ Edit News */
export const updateNews = async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* 🗑 Delete News */
export const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "News deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*  Increase Views (public page) */
export const increaseViews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true },
    );
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSingleArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
