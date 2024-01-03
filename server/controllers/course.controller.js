import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import { createCourse } from "../service/course.service.js";
import CourseModel from "../models/course.model.js";
import userModel from "../models/user.model.js";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail.js";
import { title } from "process";

export const uploadCourse = CatchAsyncError(async (req, res, next) => {
  try {
    const { data } = req.body;
    const thumbnail = data.thumbnail;
    data.user = req.user;
    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    createCourse(data, res, next);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const editCourse = CatchAsyncError(async (req, res, next) => {
  try {
    const data = req.body;
    const thumbnail = data.thumbnail;

    if (thumbnail) {
      await cloudinary.v2.uploader.destroy(thumbnail.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const courseId = req.params.id;

    const course = await CourseModel.findByIdAndUpdate(
      courseId,
      data,
      {
        $set: data,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getSingleCourse = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const course = await CourseModel.findById(courseId).select(
      "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
    );

    res.status(200).json({ success: true, course });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getAllCourses = CatchAsyncError(async (req, res, next) => {
  try {
    const courses = await CourseModel.find().select(
      "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
    );

    res.status(200).json({ success: true, courses });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getPurchasedCourses = CatchAsyncError(async (req, res, next) => {
  try {
    const userCourseList = req.user?.courses;
    const courses = await CourseModel.find({
      _id: { $in: userCourseList },
    }).select(
      "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
    );
    res.status(200).json({ success: true, courses });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getMyCourses = CatchAsyncError(async (req, res, next) => {
  try {
    const courses = await CourseModel.find({
      "user._id": req.user._id,
    }).select(
      "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
    );
    res.status(200).json({ success: true, courses });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getCourseByUser = CatchAsyncError(async (req, res, next) => {
  try {
    const userCourseList = req.user?.courses;
    const courseId = req.params.id;
    const courseExists = userCourseList?.find(
      (course) => course._id.toString() === courseId
    );

    if (!courseExists) {
      return next(
        new ErrorHandler("You are not eligible to access this course", 404)
      );
    }

    const course = await CourseModel.findById(courseId).select("+reviews.user.avatar");

    const content = course?.courseData;
    const reviews = course?.reviews;
    
    res.status(201).json({
      success: true,
      content,
      reviews,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const addQuestion = CatchAsyncError(async (req, res, next) => {
  try {
    const { question, courseId, contentId } = req.body;
    const course = await CourseModel.findById(courseId);

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid content Id", 400));
    }

    const courseContent = course?.courseData?.find((item) =>
      item._id.equals(contentId)
    );

    if (!courseContent) {
      return next(new ErrorHandler("Invalid content Id", 400));
    }

    const newQuestion = {
      user: req.user,
      question,
      questionReplies: [],
    };

    courseContent.questions.push(newQuestion);

    await course?.save();

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const addAnswer = CatchAsyncError(async (req, res, next) => {
  try {
    const { answer, courseId, contentId, questionId } = req.body;

    const course = await CourseModel.findById(courseId);

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid content Id", 400));
    }

    const courseContent = course?.courseData?.find((item) =>
      item._id.equals(contentId)
    );

    if (!courseContent) {
      return next(new ErrorHandler("Invalid content Id", 400));
    }

    const question = courseContent?.questions?.find((item) =>
      item._id.equals(questionId)
    );

    if (!question) {
      return next(new ErrorHandler("Invalid question Id", 400));
    }

    const newAnswer = {
      user: req.user,
      answer,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    question.questionReplies.push(newAnswer);

    await course?.save();

    if (req.user?._id === question.user._id) {
    } else {
      const data = {
        name: question.user.name,
        title: courseContent.title,
      };

      const html = await ejs.renderFile(
        path.join(process.cwd(), "mails/question-reply.ejs"),
        data
      );

      try {
        await sendMail({
          email: question.user.email,
          subject: "Question Reply",
          template: "question-reply.ejs",
          data,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const addReview = CatchAsyncError(async (req, res, next) => {
  try {
    const userCourseList = req.user?.courses;

    const courseId = req.params.id;
    const courseExists = userCourseList?.some(
      (course) => course._id.toString() === courseId.toString()
    );

    if (!courseExists) {
      return next(
        new ErrorHandler("You are not eligible to access this course", 404)
      );
    }

    const course = await CourseModel.findById(courseId);

    const { review, rating } = req.body;

    const reviewData = {
      user: req.user,
      comment: review,
      rating,
    };

    course?.reviews.push(reviewData);

    let avg = 0;

    course?.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    if (course) {
      course.ratings = avg / course.reviews.length;
    }

    await course?.save();

    const notification = {
      title: "New Review Received",
      message: `${req.user?.name} has given a review in ${course?.name}`,
    };

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const addReplyToReview = CatchAsyncError(async (req, res, next) => {
  try {
    const { comment, courseId, reviewId } = req.body;

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const review = course?.reviews?.find(
      (rev) => rev._id.toString() === reviewId
    );

    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }

    const replyData = {
      user: req.user,
      comment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (!review.commentReplies) {
      review.commentReplies = [];
    }

    review.commentReplies?.push(replyData);

    await course?.save();

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const buyCourse = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const getUser = req.user;
    const course = await CourseModel.findById(courseId);
    const user = await userModel.findById(getUser._id);

    user?.courses.push({ _id: courseId });

    const newUnit = user?.unit - course?.price;

    user.unit = newUnit;

    await user?.save();

    const newPurchase = course?.purchased + 1;

    course.purchased = newPurchase;

    await course?.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
