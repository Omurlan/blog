import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    preview: String,
    previewText: String,
    content: String,
    author: String,
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default blogModel;
