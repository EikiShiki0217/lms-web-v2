import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "../../features/courses/coursesApi";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { useCallback } from "react";

const CLOUD_NAME = "dkxcntwxu";
const UPLOAD_PRESET = "vgfixkrc";

const AddCourse = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();
  const [demoVideoFile, setDemoVideoFile] = useState(null);
  const [videoFiles, setVideoFiles] = useState([]);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Хичээлийн Гарчиг",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState({});

  const uploadFile = async (file, videoType, index) => {
    if (!file) {
      console.error("Please select a file.");
      return;
    }

    const uniqueUploadId = generateUniqueUploadId();
    const chunkSize = 5 * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;

    const uploadChunk = async (start, end) => {
      const formData = new FormData();
      formData.append("file", file.slice(start, end));
      formData.append("cloud_name", CLOUD_NAME);
      formData.append("upload_preset", UPLOAD_PRESET);
      const contentRange = `bytes ${start}-${end - 1}/${file.size}`;

      console.log(
        `Uploading chunk for uniqueUploadId: ${uniqueUploadId}; start: ${start}, end: ${
          end - 1
        }`
      );

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
          {
            method: "POST",
            body: formData,
            headers: {
              "X-Unique-Upload-Id": uniqueUploadId,
              "Content-Range": contentRange,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Chunk upload failed.");
        }

        currentChunk++;

        if (currentChunk < totalChunks) {
          const nextStart = currentChunk * chunkSize;
          const nextEnd = Math.min(nextStart + chunkSize, file.size);
          uploadChunk(nextStart, nextEnd);
        } else {
          const fetchResponse = await response.json();
          console.info("File upload complete.");
          if (videoType === 0) {
            setCourseInfo({ ...courseInfo, demoUrl: fetchResponse.url });
          } else {
            const updatedData = [...courseContentData];
            updatedData[index].videoUrl = fetchResponse.url;
            setCourseContentData(updatedData);
          }
        }
      } catch (error) {
        console.error("Error uploading chunk:", error);
      }
    };

    const start = 0;
    const end = Math.min(chunkSize, file.size);
    uploadChunk(start, end);
  };

  const generateUniqueUploadId = () => {
    return `uqid-${Date.now()}`;
  };

  const handleSubmit = async () => {
    uploadFile(demoVideoFile, 0, -1);

    videoFiles.map((item, index) => uploadFile(item, 1, index));
  };

  const DataSet = useCallback(() => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };
    setCourseData(data);
  }, [
    benefits,
    courseContentData,
    courseInfo.demoUrl,
    courseInfo.description,
    courseInfo.estimatedPrice,
    courseInfo.level,
    courseInfo.name,
    courseInfo.price,
    courseInfo.tags,
    courseInfo.thumbnail,
    prerequisites,
  ]); 

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created");
      navigate("/profile");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error;
        toast.error(errorMessage.data.message);
      }
    }
    if (courseInfo.demoUrl !== "" && active < 3) {
      setActive(active + 1);
      DataSet();
    }
  }, [DataSet, active, courseInfo.demoUrl, error, isSuccess, navigate]);

  const handleCourseCreate = async () => {
    const data = courseData;
    console.log(data.thumbnail);
    if (!isLoading) {
      await createCourse(data);
    }
  };

  return (
    <>
      <div>
        <Toaster />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={0}
          route={route}
          setRoute={setRoute}
        />
        <div className="w-full flex justify-center mt-8">
          <div className="w-[70%]">
            {active === 0 && (
              <CourseInformation
                courseInfo={courseInfo}
                setCourseInfo={setCourseInfo}
                active={active}
                setActive={setActive}
                setDemoVideoFile={setDemoVideoFile}
                demoVideoFile={demoVideoFile}
              />
            )}
            {active === 1 && (
              <CourseData
                benefits={benefits}
                setBenefits={setBenefits}
                prerequisites={prerequisites}
                setPrerequisites={setPrerequisites}
                active={active}
                setActive={setActive}
              />
            )}
            {active === 2 && (
              <CourseContent
                active={active}
                setActive={setActive}
                courseContentData={courseContentData}
                setCourseContentData={setCourseContentData}
                handleSubmit={handleSubmit}
                setVideoFiles={setVideoFiles}
                videoFiles={videoFiles}
              />
            )}
            {active === 3 && (
              <CoursePreview
                active={active}
                setActive={setActive}
                courseData={courseData}
                handleCourseCreate={handleCourseCreate}
              />
            )}
          </div>
          <div className="w-[30%] h-screen z-[1] top-18 right-0">
            <CourseOptions active={active} setActive={setActive} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
