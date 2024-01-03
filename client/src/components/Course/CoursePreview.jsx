import React, { useEffect, useState } from "react";
import CoursePlayer from "../../utils/CoursePlayer";
import Ratings from "../../utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const CoursePreview = ({
  active,
  setActive,
  courseInfo,
  courseContentData,
  benefits,
  videoFiles,
  prerequisites,
  handleCourseCreate,
}) => {
  const [demoUrl, setDemoUrl] = useState(null);

  const discountPercentege =
    ((courseInfo?.estimatedPrice - courseInfo?.price) /
      courseInfo?.estimatedPrice) *
    100;
  const discountPercentegePrice = discountPercentege.toFixed(0);

  useEffect(() => {
    console.log(videoFiles);
    if (videoFiles && videoFiles.length > 0) {
      const videoFile = videoFiles[0];
      const videoUrl = URL.createObjectURL(videoFile);
      setDemoUrl(videoUrl);
    }
  }, [videoFiles]);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };
  return (
    <div className="w-[90%] m-auto mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={typeof demoUrl === "string" ? demoUrl : null}
            title={courseInfo?.title}
          />
        </div>
        <div className="flex item-center">
          <h1 className="pt-3 text-[25px]">
            {courseInfo?.price === 0 ? "Free" : courseInfo?.price + "₮"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {courseInfo?.estimatedPrice}₮
          </h5>

          <h4 className="pl-5 pt-3 text-[25px]">
            {discountPercentegePrice}% Off
          </h4>
        </div>
        <div className="flex items-center">
          <div className=" flex flex-row justify-center items-center py-3 px-6 rounded-full min-h-[45px] text-[16px] font-Poppins font-semibold text-white !w-[180px] my-3 !bg-[crimson] cursor-not-allowed">
            Buy now {courseInfo?.price}₮
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount code..."
            className=" text-white bg-transparent border rounded h-[40px] px-2 outline-none 1500px:!w-[50px] 1100px: w-[60%] ml-3 !mt-0"
          />
          <div className="flex flex-row justify-center items-center py-3 px-6 rounded-full bg-[#2100ff] min-h-[45px] text-[16px] font-semibold text-white !w-[120px] my-3 ml-4 font-Poppins cursor-pointer">
            Apply
          </div>
        </div>
        <p className="pb-1">Source code included</p>
        <p className="pb-1">Full lifetime access</p>
        <p className="pb-1">Certificate of complePremium supporttion</p>
        <p className="pb-1 800px:pb-1">Premium support</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600]">
            {courseInfo?.name}
          </h1>
          <div className="fleex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-Poppins font-[600]">
            What you will learn from this course?
          </h1>
        </div>
        {benefits?.map((item, index) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600]">
            Course Details
          </h1>
          <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
            {courseInfo?.description}
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => createCourse()}
        >
          Create
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
