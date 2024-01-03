import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import CourseAccessDetail from "./CourseAccessDetail";
import { useLoadUserQuery } from "../../app/api/apiSlice";

const CourseAccess = () => {
  const { courseId } = useParams();
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item) => item._id === courseId
      );
      if (!isPurchased) {
        navigate("/");
      }
    }

    if (error) {
      navigate("/");
    }
  }, [courseId, data, error, navigate]);
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
          <CourseAccessDetail courseId={courseId} user={data.user} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseAccess;
