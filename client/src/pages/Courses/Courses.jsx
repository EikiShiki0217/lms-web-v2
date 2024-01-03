import React, { useState } from "react";
import Header from "../../components/Header";
import AllCourses from "./AllCourses";

import useTitle from "../../hooks/useTitle";
import Footer from "../../components/Footer";

const Courses = () => {
  useTitle(`Courses`);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <div className="">
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={1}
        route={route}
        setRoute={setRoute}
      />
      <br />
      <AllCourses />
      <Footer />
    </div>
  );
};

export default Courses;
