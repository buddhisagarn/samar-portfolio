import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
    },
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    avatar: String,
    provider: {
      type: String,
      default: "google",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Subscriber", subscriberSchema);
