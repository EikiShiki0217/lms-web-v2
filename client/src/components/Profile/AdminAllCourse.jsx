"use client";
import React from "react";
import { useGetAllCoursesQuery } from "../../features/courses/coursesApi";
import { useState } from "react";
import { useEffect } from "react";
import CourseCard from "../Course/CourseCard";

const AdminAllCourses = () => {
  const { isLoading, data } = useGetAllCoursesQuery();
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
      </div>
    </div>
  );
};

export default AdminAllCourses;
