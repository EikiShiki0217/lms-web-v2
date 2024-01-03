"use client";
import { apiSlice } from "../../app/api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: {
          data,
        },
        credentials: "include",
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "get-courses",
        method: "GET",
        credentials: "include",
      }),
    }),
    getMyCourses: builder.query({
      query: () => ({
        url: `get-my-courses`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getPurchasedCourses: builder.query({
      query: () => ({
        url: `get-purchased-courses`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getCourseDetails: builder.query({
      query: (courseId) => ({
        url: `get-course/${courseId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    buyCourse: builder.mutation({
      query: (courseId) => ({
        url: "buy-course",
        method: "POST",
        body: {
          courseId,
        },
        credentials: "include",
      }),
    }),
    deleteCourse: builder.query({
      query: (courseId) => ({
        url: `delete-course/${courseId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getCourseContent: builder.query({
      query: (courseId) => ({
        url: `get-course-content/${courseId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: "add-question",
        method: "PUT",
        body: { question, courseId, contentId },
        credentials: "include",
      }),
    }),
    addAnswerInQuestion: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: "add-answer",
        method: "PUT",
        body: { answer, courseId, contentId, questionId },
        credentials: "include",
      }),
    }),
    addNewReview: builder.mutation({
      query: ({ courseId, review, rating }) => ({
        url: `add-review/${courseId}`,
        method: "PUT",
        body: {
          review,
          rating,
        },
        credentials: "include",
      }),
    }),
    addReplyInReview: builder.mutation({
      query: ({ comment, courseId, reviewId }) => ({
        url: "add-reply",
        method: "PUT",
        body: { comment, courseId, reviewId },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetMyCoursesQuery,
  useGetPurchasedCoursesQuery,
  useGetCourseDetailsQuery,
  useBuyCourseMutation,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddNewReviewMutation,
  useAddReplyInReviewMutation,
} = coursesApi;
