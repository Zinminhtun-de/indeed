import express from "express";
import isAuth from "../middlewares/is_auth";
import {
  createNeed,
  findNeed,
  findNeeds,
  removeNeed,
  updateNeed,
} from "../controllers/NeedController";
import { body } from "express-validator";

const router = express.Router();

router
  .route("/")
  .get(isAuth, findNeeds)
  .post(
    isAuth,
    [
      body("header").notEmpty().withMessage("Header must not be empty!"),
      body("body").notEmpty().withMessage("Body must not be empty!"),
      body("tags").isArray(),
    ],
    createNeed
  );

router
  .route("/:id")
  .get(isAuth, findNeed)
  .put(
    isAuth,
    [
      body("header").notEmpty().withMessage("Header must not be empty!"),
      body("body").notEmpty().withMessage("Body must not be empty!"),
      body("tags").isArray(),
      body("status").isBoolean(),
    ],
    updateNeed
  )
  .delete(isAuth, removeNeed);

export default router;
