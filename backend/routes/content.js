import auth from "../middleware/auth.js";
import express from "express";

const router = express.Router();

router.get("/", auth, (_, res) => {
  res.send({ content: "Content from my backend" });
});

export default router;
