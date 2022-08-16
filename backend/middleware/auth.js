import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.cookies["x-auth-token"];
  if (!token) return res.status(401).send("Access Denied. No token provided.");

  try {
    const decoded = jwt.verify(token, "123456");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
