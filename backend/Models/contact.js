import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  contact: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
});

export default mongoose.model("messageinfo", messageSchema);
