//import
import mongoose, { Schema } from "mongoose";

//Schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user", //model name
    },
  },
  { timestamps: true }
);

//model
const Blog = mongoose.model("blog", blogSchema);

//export
export default Blog;
