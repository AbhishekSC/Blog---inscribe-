import Blog from "../models/blog.model.js";

async function handleCreateBlog(req, res) {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title: title,
    body: body,
    coverImageURL: `/uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });
  return res.redirect(`/`);
}

export { handleCreateBlog };
