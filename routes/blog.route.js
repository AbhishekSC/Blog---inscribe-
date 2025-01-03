// import router
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { handleCreateBlog } from "../controllers/blog.controller.js";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

// initialize router
const router = Router();

// create router
router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), handleCreateBlog);
router.get("/:id", async (req, res) => {
  const blogID = req.params.id;
  const blog = await Blog.findById(blogID).populate("createdBy");
  const comments = await Comment.find({ blogId: blogID }).populate("createdBy");
  console.log(blog);

  return res.render("blog", {
    blog: blog,
    user: req.user,
    comments: comments,
  });
});

//comment
router.post("/comment/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  const blog = await Comment.create({
    content: req.body.content,
    blogId: blogId,
    createdBy: req.user._id,
  });

  console.log(blog);

  return res.redirect(`/blog/${blogId}`);
});

//export router
export default router;
