import mongoose from "mongoose";

const GetInvolvedSchema = new mongoose.Schema(
  {
    heading: String,
    description: String,

    cards: [
      {
        title: String,
        description: String,
      },
    ],

    ctaPrimary: String,
    ctaSecondary: String,
  },
  { timestamps: true },
);

export default mongoose.model("GetInvolved", GetInvolvedSchema);
