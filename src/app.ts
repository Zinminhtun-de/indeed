import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import need_route from "./routes/need_route";
import error from "./middlewares/error";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Hello World!" });
});

mongoose.connect(process.env.DATABASE || "").then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  app.use("/api/v1/needs", need_route);
  app.use(error);
});
