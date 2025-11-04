import mongoose from "mongoose";

const todoSchems = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const todo = mongoose.model("todo", todoSchems);
export default todo;
