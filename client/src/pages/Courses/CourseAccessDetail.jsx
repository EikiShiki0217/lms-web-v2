"use client";
import React from "react";
import CourseContentList from "./CourseContentList";
import { Toaster } from "react-hot-toast";
import { useGetCourseContentQuery } from "../../features/courses/coursesApi";
import Loader from "../../components/Loader";
import CourseContentMedia from "./CourseContentMedia";
import { useState } from "react";

const CourseAccessDetail = ({ courseId, user }) => {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentQuery(courseId, { refetchOnMountOrArgChange: true });
  console.log(contentData);
  const data = contentData?.content;
  const reviews = contentData?.reviews;
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full">
          <Loader />
        </div>
      ) : (
        <div>
          <Toaster />
          <div className="w-full grid 800px:grid-cols-10">
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                id={courseId}
                activeVideo={activeVideo}
                reviews={reviews}
                setActiveVideo={setActiveVideo}
                refetch={refetch}
                user={user}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList
                setActiveVideo={setActiveVideo}
                data={data}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAccessDetail;
