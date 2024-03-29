import React from "react";
import { Link } from "react-router-dom"
const ExploreCourse = () => {
  return (
    <div className="w-[95%] m-auto flex justify-center items-center h-[70vh] 800px:h-[90vh] translate-y-0 opacity-100 transition-all duration-1000 ease-in-out">
      <div className="w-[90%] 800px:w-[80%]">
        <h1 className="font-extrabold text-[25px] leading-[35px] sm:text-3xl lg:text-5xl tracking-tight text-center text-white font-Poppins 800px:!leading-[60px]">
          Өөрсдийн <span className="text-gradient">мэдлэг, боловсролоо</span>{" "}
          <br />бидэнтэй хамт тэлээрэй.
        </h1>
        <div className="pt-2"></div>
        <div className="w-full text-center">
          <p className="800px:block hidden font-poppins 800px:text-[22px] 800px:leading-[32px] text-[16px] leading-[23px] font-normal text-[#A3B3BC] mt-5 mb-10">
            Таны эрдэм мэдлэгийн их замд амжилт хүсье.
          </p>
          <div className="flex w-full justify-center font-Poppins font-[600]">
            <Link to="/courses">
              <div className="flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold">
                Хичээлүүдийг үзэх
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCourse;
