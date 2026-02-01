import mongoose from "mongoose";
const articleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    content: String,
    image: String,
  },
  { timestamps: true },
);

export default mongoose.model("Article", articleSchema);
