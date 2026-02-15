import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    description: String,
    rating: Number,
    status: {
      type: String,
      enum: ["Read", "Currently Reading", "Want to Read", "Available"],
      default: "Read",
    },
    cover: String,
    tags: [String],
  },
  { timestamps: true },
);

export default mongoose.model("Book", bookSchema);
