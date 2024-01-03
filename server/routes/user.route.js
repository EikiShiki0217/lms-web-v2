import express from "express";
import {
  activeUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateUserInfo,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  addUnit,
  getAllUsers,
} from "../controllers/user.controller.js";
import { authorizeRoles, isAutheticated } from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activeUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAutheticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAutheticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user-info", isAutheticated, updateUserInfo);
userRouter.put("/update-user-password", isAutheticated, updatePassword);
userRouter.put("/update-user-avatar", isAutheticated, updateProfilePicture);
userRouter.put("/add-unit", isAutheticated, authorizeRoles("admin"), addUnit);
userRouter.get(
  "/get-all-users",
  isAutheticated,
  authorizeRoles("admin"),
  getAllUsers
);

export default userRouter;
