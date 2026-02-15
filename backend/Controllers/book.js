import Book from "../Models/book.js";
import cloudinary from "../config/cloudinary.js";

/* GET: all read books */
export const getReadBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* POST: add a book I have read */
export const addReadBook = async (req, res) => {
  try {
    let imageUrl = "";

    // Upload image to Cloudinary if file exists
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "Books",
        },
      );

      imageUrl = uploadResult.secure_url;
    }

    // 2Process tags (convert comma string → array)
    let tags = [];
    if (req.body.tags) {
      tags = req.body.tags.split(",").map((tag) => tag.trim());
    }

    // Create book
    const book = await Book.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      rating: req.body.rating,
      status: req.body.status || "Read",
      tags,
      cover: imageUrl,
    });

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message || "Failed to create book",
    });
  }
};

/* PUT: update read book */
export const updateReadBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    let imageUrl = book.cover;

    // Upload new image if provided
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "content",
        },
      );

      imageUrl = uploadResult.secure_url;
    }

    // Process tags
    let tags = book.tags;
    if (req.body.tags) {
      tags = req.body.tags.split(",").map((tag) => tag.trim());
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        rating: req.body.rating,
        status: req.body.status,
        tags,
        cover: imageUrl,
      },
      { new: true },
    );

    res.json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message || "Failed to update book",
    });
  }
};

/* DELETE: remove read book */
export const deleteReadBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Read book removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
