import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    description: String,
    years: String,
    terms: String,
    roles: String,
    image: String,
  },
  { timestamps: true },
);

export default mongoose.model("Content", contentSchema);
