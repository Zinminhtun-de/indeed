import express from "express";
import { body } from "express-validator";
import { login, signup, editProfile } from "../controllers/AuthController";
import User from "../models/User";
import isAuth from "../middlewares/is_auth";
// import isAuth from "../middlewares/is-auth";
const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .custom((v) => {
        return User.findOne({ email: v }).then((user) => {
          if (user) {
            return Promise.reject("User with this email already existed!");
          }
          return Promise.resolve();
        });
      }),
    body("password").notEmpty().withMessage("Password must not be empty!"),
  ],
  signup
);

router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email!"),
    body("password").notEmpty().withMessage("Password must not be empty!"),
  ],
  login
);

router.put(
  "/edit-profile",
  isAuth,
  [body("username").notEmpty().withMessage("Username must not be empty!")],
  editProfile
);

export default router;
