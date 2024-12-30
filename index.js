import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import { connectToMongoDB } from "./db/index.js";
import { checkForAuthenticationCookie } from "./middlewares/authentication.middleware.js";

const app = express();
const PORT = 8000;

//connecting to MongoDB
connectToMongoDB();

//setting path and engine for views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//application middleware
app.use(express.urlencoded({ extended: false })); //handling FORM data
app.use(cookieParser()); //handling cookies
app.use(checkForAuthenticationCookie("token"));

//routes
app.get("/", (req, res) => {
  return res.render("home", {
    user: req.user,
  });
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`****Server started at PORT- ${PORT}****`);
});
