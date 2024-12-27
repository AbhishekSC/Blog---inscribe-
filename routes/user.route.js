import { Router } from "express";
import { handleUserSignin, handleUserSignup } from "../controllers/user.controller.js";

const router = Router();

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

export default router;
