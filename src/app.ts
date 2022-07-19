import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (_req, res) => {
  res.json({ message: "Hello World!" });
});

mongoose.connect(process.env.DATABASE || "").then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
