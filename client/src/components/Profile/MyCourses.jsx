"use client";
import React from "react";
import { useGetMyCoursesQuery } from "../../features/courses/coursesApi";
import { useState } from "react";
import { useEffect } from "react";
import CourseCard from "../Course/CourseCard";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

const MyCourses = () => {
  const { isLoading, data } = useGetMyCoursesQuery();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      setCourses(data?.courses);
    }
  }, [data, isLoading]);

  return (
    <div className="w-[80%] m-auto">
      <br />
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] mb-12 border-0">
        {courses &&
          courses.map((item, index) => <CourseCard item={item} key={index} />)}
        <Link to="/add-course">
          <div className="flex justify-center items-center w-full h-[46vh] bg-slate-500 bg-opacity-20 backdrop-blur border border-[#ffffff1d] shadow-[bg-slate-700] rounded-lg p-3 shadow-sm">
            <IoIosAdd size={80} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyCourses;
