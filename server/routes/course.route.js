import express from "express";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  buyCourse,
  editCourse,
  getAllCourses,
  getCourseByUser,
  getMyCourses,
  getPurchasedCourses,
  getSingleCourse,
  uploadCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
import { isAutheticated } from "../middleware/auth.js";

const courseRouter = express.Router();

courseRouter.post("/create-course", isAutheticated, uploadCourse);
courseRouter.put("/edit-course/:id", isAutheticated, editCourse);
courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.get("/get-courses", getAllCourses);
courseRouter.get("/get-course-content/:id", isAutheticated, getCourseByUser);
courseRouter.put("/add-question", isAutheticated, addQuestion);
courseRouter.put("/add-answer", isAutheticated, addAnswer);
courseRouter.put("/add-review/:id", isAutheticated, addReview);
courseRouter.put("/add-reply", isAutheticated, addReplyToReview);
courseRouter.put("/delete-course", isAutheticated, deleteCourse);
courseRouter.get("/get-my-courses", isAutheticated, getMyCourses)
courseRouter.get("/get-purchased-courses", isAutheticated, getPurchasedCourses);
courseRouter.post("/buy-course", isAutheticated, buyCourse);

export default courseRouter;
