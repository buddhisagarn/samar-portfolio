import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String, // keep string since UI uses "Jan 12, 2026"
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true, // future draft feature
    },
  },
  { timestamps: true },
);

export default mongoose.model("News", newsSchema);
