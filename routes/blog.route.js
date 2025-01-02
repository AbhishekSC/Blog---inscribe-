// import router
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { handleCreateBlog } from "../controllers/blog.controller.js";

// initialize router
const router = Router();

// create router
router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), handleCreateBlog);

//export router
export default router;
