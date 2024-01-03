import React, { useCallback, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "../../features/courses/coursesApi";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Loader from "../../components/Loader";

const CLOUD_NAME = "dkxcntwxu";
const UPLOAD_PRESET = "vgfixkrc";

const AddCourse = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [active, setActive] = useState(0);
  const [videoFiles, setVideoFiles] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [videoId, setVideoId] = useState([]);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      title: "",
      description: "",
      videoSection: "Хичээлийн Гарчиг",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      videoLength: "",
      suggestion: "",
    },
  ]);

  const [createCourse, { isSuccess, error }] = useCreateCourseMutation();
  const navigate = useNavigate();

  const uploadFile = async (file) => {
    return new Promise(async (resolve, reject) => {
      if (!file) {
        reject(new Error("Please select a file."));
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
            await uploadChunk(nextStart, nextEnd);
          } else {
            const fetchResponse = await response.json();
            console.info("File upload complete.");
            setVideoUrls((prevUrls) => [...prevUrls, fetchResponse.url]);
            setVideoId((prevId) => [...prevId, fetchResponse.public_id]);
            resolve(); // Resolve the promise when the upload is complete
          }
        } catch (error) {
          console.error("Error uploading chunk:", error);
          reject(error); // Reject the promise if there is an error
        }
      };

      const start = 0;
      const end = Math.min(chunkSize, file.size);
      await uploadChunk(start, end);
    });
  };

  const generateUniqueUploadId = () => {
    return `uqid-${Date.now()}`;
  };

  const dataSet = useCallback(() => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    const formattedCourseContentData = courseContentData.map(
      (courseContent, index) => ({
        videoUrl: {
          public_id: videoId[index + 1],
          url: videoUrls[index + 1],
        },
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
      demoUrl: {
        public_id: videoId[0],
        url: videoUrls[0],
      },
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };

    createCourse(data);
  }, [
    benefits,
    courseContentData,
    courseInfo.description,
    courseInfo.estimatedPrice,
    courseInfo.level,
    courseInfo.name,
    courseInfo.price,
    courseInfo.tags,
    courseInfo.thumbnail,
    createCourse,
    prerequisites,
    videoId,
    videoUrls,
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
  }, [isSuccess, error, navigate]);

  useEffect(() => {
    if (!loading && videoUrls.length > 0) {
      dataSet();
    }
  }, []);

  const handleCourseCreate = async () => {
    try {
      setLoading(true);

      for (const file of videoFiles) {
        await uploadFile(file);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false when file uploads are complete
    }
  };

  const dataSetCallback = useCallback(() => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    const formattedCourseContentData = courseContentData.map(
      (courseContent, index) => ({
        videoUrl: {
          public_id: videoId[index + 1],
          url: videoUrls[index + 1],
        },
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
      demoUrl: {
        public_id: videoId[0],
        url: videoUrls[0],
      },
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };

    createCourse(data);
  }, [
    benefits,
    courseContentData,
    courseInfo.description,
    courseInfo.estimatedPrice,
    courseInfo.level,
    courseInfo.name,
    courseInfo.price,
    courseInfo.tags,
    courseInfo.thumbnail,
    createCourse,
    prerequisites,
    videoId,
    videoUrls,
  ]);

  useEffect(() => {
    if (!loading && videoUrls.length > 0) {
      dataSetCallback();
    }
  }, [dataSetCallback, loading, videoUrls]);

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
                setVideoFiles={setVideoFiles}
                videoFiles={videoFiles}
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
                setVideoFiles={setVideoFiles}
                videoFiles={videoFiles}
              />
            )}
            {active === 3 && (
              <CoursePreview
                active={active}
                setActive={setActive}
                courseInfo={courseInfo}
                benefits={benefits}
                prerequisites={prerequisites}
                courseContentData={courseContentData}
                handleCourseCreate={handleCourseCreate}
                videoFiles={videoFiles}
              />
            )}
          </div>
          <div className="w-[30%] h-screen z-[1] top-18 right-0">
            <CourseOptions active={active} setActive={setActive} />
          </div>
        </div>
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-70 z-[100]">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default AddCourse;
