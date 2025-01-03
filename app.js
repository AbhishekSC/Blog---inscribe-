import "dotenv/config";

import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import { connectToMongoDB } from "./db/index.js";
import { checkForAuthenticationCookie } from "./middlewares/authentication.middleware.js";

import userRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";

import Blog from "./models/blog.model.js";

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

//connecting to MongoDB
connectToMongoDB(MONGO_URI);

//setting path and engine for views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//application middleware
app.use(express.urlencoded({ extended: false })); //handling FORM data
app.use(cookieParser()); //handling cookies
app.use(express.static(path.resolve("./public"))); //statically serving the file onto our app
app.use(checkForAuthenticationCookie("token"));

//routes
//render HOME page
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  return res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`****Server started at PORT- ${PORT}****`);
});
