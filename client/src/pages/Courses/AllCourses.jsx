import { useEffect, useState } from "react";
import { useGetAllCoursesQuery } from "../../features/courses/coursesApi";
import CourseCard from "../../components/Course/CourseCard";
import { CircleLoader } from "react-spinners";

const AllCourses = () => {
  const { isSuccess, data, refetch } = useGetAllCoursesQuery();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setCourses(data.courses);
    }
    refetch();
  }, [data, isSuccess, refetch]);

  return (
    <>
      {!isSuccess ? (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <CircleLoader color="#36D7B7" loading={true} />
        </div>
      ) : (
        <div className="w-[95%] 800px:w-[80%] m-auto">
          <h1 className="text-[25px] font-[500] font-Poppins text-center py-2 800px:!text-[45px] text-[#fff]">
            All Courses
          </h1>
          <br />
          <div className="min-h-screen grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] mb-12 border-0">
            {courses &&
              courses.map((item, index) => (
                <CourseCard item={item} key={index}/>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllCourses;
