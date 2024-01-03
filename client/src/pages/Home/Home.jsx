"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import useTitle from "../../hooks/useTitle";
import ExploreCourse from "./ExploreCourse";
import { useGetAllCoursesQuery } from "../../features/courses/coursesApi";
import CourseCard from "../../components/Course/CourseCard";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
const Home = () => {
  useTitle(`Home`);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  const { isLoading, data } = useGetAllCoursesQuery({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full overflow-hidden">
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={0}
            route={route}
            setRoute={setRoute}
          />
          <ExploreCourse />
          <div>
            <div className="w-[90%] 800px:w-[80%] m-auto">
              <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-white font-extrabold tracking-tight">
                {`Unlock Your Potential with `}
                <span className="text-gradient">Comprehensive</span>
                <br />
                <span className="text-gradient">Project-Based</span>
                {` Courses for
            Career Growth`}
              </h1>
              <br />
              <br />
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] mb-12 border-0">
                {courses &&
                  courses.map((item, index) => (
                    <CourseCard item={item} key={index} />
                  ))}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
