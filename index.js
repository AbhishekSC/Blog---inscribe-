import express from "express";
import path from "path";

import userRouter from "./routes/user.route.js";
import { connectToMongoDB } from "./db/index.js";

const app = express();
const PORT = 8000;

//connecting to MongoDB
connectToMongoDB();

//setting path and engine for views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//application middleware
app.use(express.urlencoded({ extended: false })); //handling FORM data

//routes
app.get("/", (req, res) => { 
  return res.render("home");
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`****Server started at PORT- ${PORT}****`);
});
