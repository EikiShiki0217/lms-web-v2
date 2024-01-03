import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { useGetEnrolledCoursesQuery } from "../../features/courses/coursesApi";

const test = [
  {
    name: "йыбйыб",
    description: "йыбйыбйы",
    price: "1321",
    estimatedPrice: "12321",
    tags: "",
    level: "12321",
    demoUrl: "213213",
    thumbnail: "",
    totalVideos: 1,
    benefits: [
      {
        title: "123123",
      },
      {
        title: "123213",
      },
    ],
    prerequisites: [
      {
        title: "12321",
      },
      {
        title: "12321",
      },
    ],
    courseContent: [
      {
        videoUrl: "asdsad",
        title: "asdasd",
        description: "asdsadas",
        videoSection: "Untitled Section",
        links: [
          {
            title: "asdas",
            url: "dasdas",
          },
        ],
        suggestion: "",
      },
    ],
  },
  {
    name: "йыбйыб",
    description: "йыбйыбйы",
    price: "1321",
    estimatedPrice: "12321",
    tags: "",
    level: "12321",
    demoUrl: "213213",
    thumbnail: "",
    totalVideos: 1,
    benefits: [
      {
        title: "123123",
      },
      {
        title: "123213",
      },
    ],
    prerequisites: [
      {
        title: "12321",
      },
      {
        title: "12321",
      },
    ],
    courseContent: [
      {
        videoUrl: "asdsad",
        title: "asdasd",
        description: "asdsadas",
        videoSection: "Untitled Section",
        links: [
          {
            title: "asdas",
            url: "dasdas",
          },
        ],
        suggestion: "",
      },
    ],
  },
];
const EnrolledCourses = ({ user }) => {
    const { isLoading, data } = useGetEnrolledCoursesQuery(user.email);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      if (!isLoading) {
        setCourses(data?.courses);
      }
      setCourses(test);
    }, [data, isLoading]);

    return (
      <div className="w-[80%] m-auto">
        <h1 className="text-[25px] font-[500] font-Poppins text-center py-2 800px:!text-[45px] text-[#fff]">
          My Courses
        </h1>
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] mb-12 border-0">
          {courses &&
            courses.map((item, index) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
    );
};

export default EnrolledCourses;
