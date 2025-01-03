import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

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

async function handleViewBlog(req, res) {
  const blogID = req.params.id;
  const blog = await Blog.findById(blogID).populate("createdBy");
  const comments = await Comment.find({ blogId: blogID }).populate("createdBy");
  console.log(blog);

  return res.render("blog", {
    blog: blog,
    user: req.user,
    comments: comments,
  });
}

async function handleCreateComment(req, res) {
  const blogId = req.params.blogId;
  const blog = await Comment.create({
    content: req.body.content,
    blogId: blogId,
    createdBy: req.user._id,
  });

  console.log(blog);

  return res.redirect(`/blog/${blogId}`);
}

export { handleCreateBlog, handleViewBlog, handleCreateComment };
