import CourseModel from "../models/course.model.js";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";

export const createCourse = CatchAsyncError(async (data, res, next) => {
  const course = await CourseModel.create(data);
  res.status(201).json({
    success: true,
    course,
  });
});
