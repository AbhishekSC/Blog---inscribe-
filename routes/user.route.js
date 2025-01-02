//import router
import { Router } from "express";
import {
  handleUserSignin,
  handleUserSignup,
} from "../controllers/user.controller.js";

//initialize router
const router = Router();

// create route
//user sign-in
router.get("/signin", (req, res) => {
  return res.render("signin");
});

//user sign-up
router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", handleUserSignup);
router.post("/signin", handleUserSignin);
router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

export default router;
