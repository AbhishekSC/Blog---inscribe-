// import router
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { handleCreateBlog } from "../controllers/blog.controller.js";
import Blog from "../models/blog.model.js";

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
  console.log(blog);

  return res.render("blog", {
    blog: blog,
    user: req.user,
  });
});

//export router
export default router;
