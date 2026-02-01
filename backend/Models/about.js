import mongoose from "mongoose";
const skillSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  about: {
    type: String,
    require: true,
  },
});

const aboutSchema = mongoose.Schema({
  about: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  pictitle: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  skill: [skillSchema],
});

export default mongoose.model("aboutSchema", aboutSchema);
