import express from "express";
import { authUser } from "../Controllers/authController.js";
import passport from "passport";

const router = express.Router();

router.post("/login", authUser);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    //  SUCCESS → you got a real Gmail
    const { email, name } = req.user;
    

    res.redirect(
      `http://localhost:5173/?email=${email}&name=${encodeURIComponent(name)}`,
    );
  },
);

export default router;
