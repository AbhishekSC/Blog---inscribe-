// import router
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  handleCreateBlog,
  handleCreateComment,
  handleViewBlog,
} from "../controllers/blog.controller.js";
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
router.get("/:id", handleViewBlog);

//comment
router.post("/comment/:blogId", handleCreateComment);

//export router
export default router;
