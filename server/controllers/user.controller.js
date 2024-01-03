import dotenv from "dotenv";
dotenv.config();
import userModel from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt.js";
import { getUserById } from "../service/user.service.js";
import cloudinary from "cloudinary";

// register
export const registrationUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check is email exist
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return next(new ErrorHandler("Email already exist", 404));
    }

    // create activation token
    const user = { name, email, password };

    const activationToken = createActivationToken(user);

    const activationCode = activationToken.activationCode;

    const data = {
      user: {
        name: user.name,
      },
      activationCode,
    };

    // mail sending
    const html = await ejs.renderFile(
      path.join(process.cwd(), "mails/activation-mail.ejs"),
      { user: data.user, activationCode: data.activationCode }
    );

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        template: "activation-mail.ejs",
        data,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account:`,
        activationToken: activationToken.token,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// activation token creater
export const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

// activation
export const activeUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { activation_token, activation_code } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (newUser.activationCode !== activation_code) {
      return next(new ErrorHandler("Invalid activation code", 400));
    }

    const { name, email, password } = newUser.user;

    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return next(new ErrorHandler("Email already exist", 400));
    }

    const userId = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await userModel.create({
      userId,
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// login
export const loginUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// logout
export const logoutUser = CatchAsyncError(async (req, res, next) => {
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });

    const userId = req.user?._id || "";

    res.status(200).json({
      success: true,
      message: "Logged out succesfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// update access token
export const updateAccessToken = CatchAsyncError(async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);

    const message = "Could not refresh token";
    if (!decoded) {
      return next(new ErrorHandler(message, 400));
    }

    const user = await userModel.findById(decoded.id);

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "5m",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "3d",
    });

    req.user = user;

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(200).json({
      status: "success",
      accessToken,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// get user info
export const getUserInfo = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user?._id;
    getUserById(userId, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const socialAuth = CatchAsyncError(async (req, res, next) => {
  try {
    const { email, name, avatar } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      const userId = Math.floor(100000 + Math.random() * 900000).toString();
      const newUser = await userModel.create({ userId, email, name, avatar });
      sendToken(newUser, 200, res);
    } else {
      sendToken(user, 200, res);
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// update user info
export const updateUserInfo = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const userId = req.user?._id;
    const user = await userModel.findById(userId);

    if (email && user) {
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exist", 400));
      }
      user.email = email;
    }

    if (name && user) {
      user.name = name;
    }

    await user?.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// update password
export const updatePassword = CatchAsyncError(async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return next(new ErrorHandler("Please enter old and new password", 400));
    }

    const user = await userModel.findById(req.user?._id).select("+password");

    if (user?.password === undefined) {
      return next(new ErrorHandler("Invalid user", 400));
    }

    const isPasswordMatch = await user?.comparePassword(oldPassword);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid old password", 400));
    }

    user.password = newPassword;

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// update profile picture
export const updateProfilePicture = CatchAsyncError(async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const userId = req.user?._id;

    const user = await userModel.findById(userId);

    if (avatar && user) {
      if (user?.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      } else {
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }

    await user?.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// add unit
export const addUnit = CatchAsyncError(async (req, res, next) => {
  try {
    const { userId, unit } = req.body;

    const user = await userModel.findOne({ userId });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    user.unit += unit;

    user?.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getAllUsers = CatchAsyncError(async (req, res, next) => {
  try {
    const users = await userModel.find({ role: "user" });
    res.status(200).json({
      succes: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
