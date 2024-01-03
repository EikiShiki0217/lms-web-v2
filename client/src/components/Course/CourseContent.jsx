import React, { useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { Toaster, toast } from "react-hot-toast";

const CourseContent = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  videoFiles,
  setVideoFiles,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const prevButton = () => [setActive(active - 1)];

  const handleCollapseToggle = (index) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index, linkIndex) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        title: "",
        description: "",
        videoSection: `Хичээлийн Гарчиг ${activeSection}`,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section can't be empty");
    } else {
      setActive(active + 1);
    }
  };
  return (
    <div className="w-[80%] m-auto block">
      <Toaster />
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item, index) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <div key={index}>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mb-5" : "mb-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === "Хичээлийн Гарчиг"
                            ? "w-[170px"
                            : "w-max"
                        } font-Poppins cursor-pointer text-white bg-transparent outline-none`}
                        value={item.videoSection || ""}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BsPencil className="cursor-pointer text-white" />
                    </div>
                  </>
                )}
                <div className="flex w-full items-center justify-between my-8">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins text-white">
                          {index + 1}, {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`text-white text-[20px] mr-2 ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="text-white"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className="text-[20px] font-Poppins text-white">
                        Бичлэгийн гарчиг
                      </label>
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins my-2"
                        value={item.title || ""}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="text-[20px] font-Poppins text-white">
                        Бичлэг
                      </label>
                      <label
                        className="w-full min-h-[40px] border-white p-3 flex items-center text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
                        htmlFor={`video-${index}`}
                      >
                        {videoFiles.length > index + 1
                          ? videoFiles[index + 1]?.name
                          : "Бичлэг оруулах" + index}
                      </label>
                      <input
                        type="file"
                        accept="video/*"
                        id={`video-${index}`}
                        className="hidden"
                        onChange={(e) => {
                          const updatedData = [...videoFiles];
                          updatedData[index + 1] = e.target.files[0];
                          setVideoFiles(updatedData);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="text-[20px] font-Poppins text-white">
                        Бичлэгийн тайлбар
                      </label>
                      <textarea
                        rows={8}
                        cols={30}
                        type="text"
                        className="w-full text-white bg-transparent border rounded px-2 outline-none mt-[10px] font-Poppins my-2 !h-min py-2"
                        value={item.description || ""}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                    </div>
                    {item?.links.map((link, linkIndex) => (
                      <div className="mb-3 block" key={index}>
                        <div className="w-full flex items-center justify-between">
                          <label className="text-[20px] font-Poppins text-white">
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-white text-[20px]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source Code... (Link Title)"
                          className="w-full text-white bg-transparent border rounded px-2 outline-none mt-[10px] font-Poppins my-2 !h-min py-2"
                          value={link.title || ""}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].title =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Source Code Url... (Link URL)"
                          className="w-full text-white bg-transparent border rounded px-2 outline-none mt-[10px] font-Poppins my-2 !h-min py-2"
                          value={link.url || ""}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].url =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    ))}
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[20px] text-white cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" />
                        Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[20px] text-white cursor-pointer"
                      onClick={(e) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] text-white cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add New Section
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
