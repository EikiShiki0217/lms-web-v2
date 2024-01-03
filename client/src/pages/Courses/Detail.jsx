"use client";
import React from "react";
import Ratings from "../../utils/Ratings";
import CoursePlayer from "../../utils/CoursePlayer";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import CourseContentList from "./CourseContentList";
import { Toaster, toast } from "react-hot-toast";
import { useBuyCourseMutation } from "../../features/courses/coursesApi";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const Detail = ({ course }) => {
  const { user } = useSelector((state) => state.auth);
  const [buyCourse, { data, error, isSuccess }] = useBuyCourseMutation();
  const discountPercentege =
    ((course?.estimatedPrice - course?.price) / course?.estimatedPrice) * 100;
  const discountPercentegePrice = discountPercentege.toFixed(0);
  console.log(course);
  const isPurchased =
    user && user?.courses?.find((item) => item._id === course._id);

  const handleOrder = async (e) => {
    if (!user) {
      toast.error("Нэвтэрнэ үү!");
    } else {
      await buyCourse(course._id);
    }
  };

  const DeleteCourse = async () => {
    await DeleteCourse(course._id);
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
    }

    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [error, isSuccess]);

  return (
    <div>
      <Toaster />
      {course.user ? (
        <div className="w-[90%] 800px:w-[90%] m-auto py-5">
          <div className="w-full flex flex-col-reverse 800px:flex-row">
            <div className="w-full 800px:w-[65%] 800px:pr-5">
              <h1 className="text-[25px] font-Poppins font-[600] text-white">
                {course.name}
              </h1>
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center">
                  <Ratings rating={course?.ratings} />
                  <h5 className="text-white">
                    {course.reviews?.length} reviews
                  </h5>
                </div>
                <h5 className="text-white">{course.purchased} Students</h5>
              </div>

              <br />
              <h1 className="text-[25px] font-Poppins font-[600] text-white">
                Та энэ хичээлээс юу сурах вэ?
              </h1>
              <div>
                {course.benefits?.map((item, index) => (
                  <div
                    className="w-full flex 800px:items-center py-2"
                    key={index}
                  >
                    <div className="w-[15px] mr-1">
                      <IoCheckmarkDoneOutline
                        size={20}
                        className="text-white"
                      />
                    </div>
                    <p className="pl-2 text-white">{item.title}</p>
                  </div>
                ))}
                <br />
                <br />
              </div>
              <h1 className="text-[25px] font-Poppins font-[600] text-white">
                Энэхүү хичээлийг эхлүүлэхийн тулд юу шаардлагатай вэ?
              </h1>
              {course.prerequisites?.map((item, index) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline size={20} className="text-white" />
                  </div>
                  <p className="pl-2 text-white">{item.title}</p>
                </div>
              ))}
              <br />
              <br />
              <div>
                <h1 className="text-[25px] font-Poppins font-[600] text-white">
                  Хичээлийн тойм
                </h1>
                <CourseContentList data={course?.courseData} isDemo={true} />
              </div>
              <br />
              <br />
              <div className="w-full">
                <h1 className="text-[25px] font-Poppins font-[600] text-white">
                  Хичээлийн тухай
                </h1>
                <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-white">
                  {course.description}
                </p>
              </div>
              <br />
              <br />
              <div className="w-full">
                <div className="800px:flex items-center">
                  <Ratings rating={course?.ratings} />
                  <div className="mb-2 800px:mb-[unset]" />
                  <h5 className="text-[18px] pl-2 800px:text-[25px] 800px:pl-[0] font-Poppins text-white">
                    {Number.isInteger(course?.ratings)
                      ? course?.ratings.toFixed(1)
                      : (course?.ratings || 0).toFixed(2)}{" "}
                    Course Rating • {course?.reviews?.length} Reviews
                  </h5>
                </div>
                <br />
                {course?.reviews &&
                  [...course.reviews].reverse().map((item, index) => (
                    <div className="w-full pb-4" key={index}>
                      <div className="flex">
                        <div className="w-[50px] h-[50px]">
                          <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                            <h1 className="uppercase text-[18px] text-white">
                              {item.user.name.slice(0, 2)}
                            </h1>
                          </div>
                        </div>
                        <div className="hidden 800px:block pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[18px] pr-2 text-white">
                              {item.user.name}
                            </h5>
                            <Ratings rating={item.rating} />
                          </div>
                          <p className="text-white">{item.comment}</p>
                          <small className="text-[#ffffff83]">
                            {format(item.createdAt)}
                          </small>
                        </div>
                        <div className="pl-2 flex 800px:hidden items-center">
                          <h5 className="text-[18px] pr-2 text-white">
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-full 800px:w-[35%] relative">
              <div className="sticky top-[100px] left-0 z-50 w-full">
                <CoursePlayer
                  videoUrl={course?.demoUrl}
                  title={course?.title}
                />
                <div className="flex items-center">
                  <h1 className="pt-5 text-[25px] text-white">
                    {course.price === 0 ? "Free" : course.price + "₮"}
                  </h1>
                  <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-white">
                    {course.estimatedPrice}₮
                  </h5>
                  <h4 className="pl-5 pt-4 text-[22px] text-white">
                    {discountPercentegePrice}% Off
                  </h4>
                </div>
                <div className="flex items-center">
                  {user.role === "admin" && (
                    <div
                      className="flex flex-row justify-center items-center py-3 px-6 rounded-full min-h-[45px]  text-[16px] font-semibold !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]"
                      onClick={DeleteCourse}
                    >
                      Устгах
                    </div>
                  )}
                  {course.user._id === user._id ? (
                    <div className="flex justify-between w-full">
                      <div
                        className="flex flex-row justify-center items-center py-3 px-6 rounded-full min-h-[45px]  text-[16px] font-semibold !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]"
                        onClick={DeleteCourse}
                      >
                        Устгах
                      </div>
                      <div
                        className="flex flex-row justify-center items-center py-3 px-6 rounded-full min-h-[45px]  text-[16px] font-semibold !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]"
                        onClick={DeleteCourse}
                      >
                        Засварлах
                      </div>
                    </div>
                  ) : isPurchased ? (
                    <Link
                      className="flex flex-row justify-center items-center py-3 px-6 rounded-full min-h-[45px]  text-[16px] font-semibold !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]"
                      to={`/course-access/${course._id}`}
                    >
                      Хичээл үзэх
                    </Link>
                  ) : (
                    <div
                      className="flex flex-row justify-center items-center py-3 px-6 rounded-full min-h-[45px]  text-[16px] font-semibold !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]"
                      onClick={handleOrder}
                    >
                      Худалдаж авах
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Detail;
