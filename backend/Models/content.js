import mongoose from "mongoose";

const journeySchema = new mongoose.Schema({
  phaseTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  years: {
    type: String,
  },
});

const contentSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    description: String,
    years: String,
    terms: String,
    roles: String,
    image: String,

    journey: {
      type: [journeySchema],
      validate: {
        validator: function (value) {
          return value.length <= 3;
        },
        message: "Maximum 3 journey phases allowed",
      },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Content", contentSchema);
