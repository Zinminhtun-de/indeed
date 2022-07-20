import express from "express";
import { createNeed, findNeeds } from "../controllers/NeedController";
import { body } from "express-validator";

const router = express.Router();

router
  .route("/")
  .get(findNeeds)
  .post(
    [
      body("header").notEmpty().withMessage("Header must not be empty!"),
      body("body").notEmpty().withMessage("Body must not be empty!"),
      body("tags").isArray(),
    ],
    createNeed
  );

export default router;
