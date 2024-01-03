import userModel from "../models/user.model.js";

export const getUserById = async (id, res) => {
  const user = await userModel.findById(id);

  if (user) {
    res.status(201).json({
      success: true,
      user,
    });
  }
};
