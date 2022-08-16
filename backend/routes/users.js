import bcrypt from "bcryptjs";
import auth from "../middleware/auth.js";
import express from "express";
import { fakeUsersDb } from "../fakeUsersDb.js";

const router = express.Router();

router.get("/me", auth, (req, res) => {
  res.send(fakeUsersDb.find((u) => u.id === req.user._id));
});

export default router;
