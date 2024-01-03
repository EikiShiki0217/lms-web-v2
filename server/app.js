import dotenv from "dotenv";
dotenv.config();
import express from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";

//body parser
app.use(express.json({ limit: "50mb" }));

//cookie parser
app.use(cookieParser());

//cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);

app.get("/test", (req, res, next) => {
  res.status(200).json({
    success: "true",
    message: "API is working",
  });
});

app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
