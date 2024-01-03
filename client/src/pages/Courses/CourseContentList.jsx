"use client";
import React from "react";
import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
const CourseContentList = ({ data, activeVideo, setActiveVideo, isDemo }) => {
  const [visibleSections, setVisibleSections] = useState(new Set());

  const videoSections = [...new Set(data?.map((item) => item.videoSection))];

  let totalCount = 0;

  const toggleSection = (section) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };
  return (
    <div
      className={`mt-[15px] w-full ${
        !isDemo && "ml-[-30px] sticky top-24 left-0 z-30"
      }`}
    >
      {videoSections.map((section, sectionIndex) => {
        const isSectionVisible = visibleSections.has(section);

        const sectionVideos = data.filter(
          (item) => item.videoSection === section
        );

        const sectionVideoCount = sectionVideos.length;
        const sectionVideoLength = sectionVideos.reduce(
          (totalLength, item) => totalLength + item.videoLength,
          0
        );

        const sectionStartIndex = totalCount;
        totalCount += sectionVideoCount;

        const sectionContentHours = sectionVideoLength / 60;
        return (
          <div
            className={`${!isDemo && "border-b border-[#ffffff8e] pb-2"}`}
            key={section}
          >
            <div className="w-full flex">
              <div className="w-full flex justify-between items-center">
                <h2 className="text-[22px] text-white"> {section}</h2>
                <button
                  className="mr-4 cursor-pointer text-white"
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? <BsChevronUp /> : <BsChevronDown />}
                </button>
              </div>
            </div>
            <h5 className="text-white">
              {sectionVideoCount} Хичээл ·{" "}
              {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionContentHours.toFixed(2)}{" "}
              {sectionVideoLength > 60 ? "hours" : "minutes"}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item, index) => {
                  const videoIndex = sectionStartIndex + index;
                  const contentLength = item.videoLength / 60;
                  return (
                    <div
                      className={`w-full ${
                        videoIndex === activeVideo ? "bg-slate-800" : ""
                      } cursor-pointer transition-all p-2`}
                      key={item._id}
                      onClick={() =>
                        isDemo ? null : setActiveVideo(videoIndex)
                      }
                    >
                      <div className="flex items-center">
                        <div>
                          <MdOutlineOndemandVideo
                            size={25}
                            className="mr-2"
                            color="#1cdada"
                          />
                        </div>
                        <h1 className="text-[18px] inline-block break-words text-white">
                          {item.title}
                        </h1>
                      </div>
                      <h5>
                        {item.videoLength > 60
                          ? contentLength.toFixed(2)
                          : item.videoLength}{" "}
                        {item.videoLength < 60 ? "hours" : "minutes"}
                      </h5>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
