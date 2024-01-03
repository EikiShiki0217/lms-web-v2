import dotenv from "dotenv";
dotenv.config();
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const isAutheticated = CatchAsyncError(async (req, res, next) => {
  const access_token = req.cookies.access_token;

  if (!access_token) {
    return next(new ErrorHandler("Please login to access this resource", 400));
  }

  const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);

  if (!decoded) {
    return next(new ErrorHandler("access token is not valid", 400));
  }

  const user = await userModel.findById(decoded.id);

  if (!user) {
    return next(new ErrorHandler("user not found", 400));
  }

  req.user = user;

  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role ${req.user?.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
