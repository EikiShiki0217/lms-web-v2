"use client";
import React from "react";
import { CircleLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <CircleLoader color="#36D7B7" loading={true} />
    </div>
  );
};
export default Loader;
