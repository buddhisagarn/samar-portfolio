import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String },
    bio1: { type: String },
    bio2: { type: String },
    vision: { type: String },
    highlights: [{ type: String }],
    social: {
      facebook: String,
      twitter: String,
      email: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Footer", aboutSchema);
