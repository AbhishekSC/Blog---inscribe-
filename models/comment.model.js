//import
import mongoose, { Schema } from "mongoose";

//schema
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

//model
const Comment = mongoose.model("comment", commentSchema);

//export
export default Comment;
