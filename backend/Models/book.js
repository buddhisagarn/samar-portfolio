import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    description: String,
    price: String,
    rating: Number,
    status: {
      type: String,
      enum: ["Available", "Coming Soon"],
      default: "Available",
    },
    cover: String,
    tags: [String],
  },
  { timestamps: true },
);

export default mongoose.model("Book", bookSchema);
