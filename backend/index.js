import express from "express";
import helmet from "helmet";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
import content from "./routes/content.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/content", content);

const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
