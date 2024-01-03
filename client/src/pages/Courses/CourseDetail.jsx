import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCourseDetailsQuery } from "../../features/courses/coursesApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Detail from "./Detail";
import Loader from "../../components/Loader";

const CourseDetail = ({ user }) => {
  const { courseId } = useParams();
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [course, setCourse] = useState([]);
  const { data, isLoading, refetch, error } = useGetCourseDetailsQuery(courseId);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      setCourse(data?.course);
    }
    if(!course) {
      navigate("/courses");
    }
  }, [course, data, error, isLoading, navigate]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full overflow-hidden">
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            route={route}
            setRoute={setRoute}
          />
          {course && <Detail course={course} refetch={refetch} />}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetail;
