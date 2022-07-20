import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { INeedCreate } from "../interfaces/INeed";

import Need from "../models/Need";
import User from "../models/User";
export const findNeeds = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const needs = await Need.find();
    res.json({ data: needs, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const createNeed = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const needDto: INeedCreate = {
      body: req.body.body,
      header: req.body.header,
      tags: req.body.tags,
      user: req.userId,
    };
    const need = new Need(needDto);
    const result = await need.save();
    const user: any = await User.findById(req.userId);
    user?.needs.push(need);
    await user?.save();
    res
      .status(201)
      .json({ message: "Created Successfully!", data: result, status: 1 });
  } catch (err) {
    // if (!err.statusCode) {
    //   err.statusCode = 500;
    // }
    next(err);
  }
};
