import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import { fakeUsersDb } from "../fakeUsersDb.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const user = fakeUsersDb.find((u) => u.username === req.body.username);
  if (!user) return res.status(400).send("Authentication Failure");

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) return res.status(400).send("Authentication Failure");

  const token = jwt.sign({ _id: user.id }, "123456");

  res.cookie("x-auth-token", token, {
    httpOnly: true,
    sameSite: true,
  });

  res.status(204).send();
});

router.post("/logout", auth, (_, res) => {
  res.clearCookie("x-auth-token");
  res.status(204).send();
});

export default router;
