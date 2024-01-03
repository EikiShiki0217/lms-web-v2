"use client";
import React, { useState } from "react";

const CourseInformation = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
  setDemoVideoFile,
  demoVideoFile,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto">
      <form
        onSubmit={handleSubmit}
        className={`text-[16px] font-Poppins text-white`}
      >
        <div>
          <label htmlFor="">Хичээлийн нэр</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.name || ""}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="Хичээлийн нэр"
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
          />
        </div>
        <br />
        <div className="mb-5">
          <label htmlFor="">Хичээлийн тайлбар</label>
          <textarea
            type=""
            name=""
            cols={30}
            rows={8}
            id=""
            required
            value={courseInfo.description || ""}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            placeholder="Хичээлийнхээ талаар бичнэ үү..."
            className="w-full text-white bg-transparent border rounded px-2 outline-none mt-[10px] font-Poppins !h-min !py-2 "
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="">Хичээлийн үнэ</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price || ""}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="99999.99"
              className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="">Үндсэн үнэ (бөглөхгүй байж болно)</label>
            <input
              type="number"
              name=""
              value={courseInfo.estimatedPrice || ""}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="edPrice"
              placeholder="99999.99"
              className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
            />
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="" className={`text-[16px] font-Poppins text-white`}>
            Хичээлийн шошго
          </label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.tags || ""}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder="Programming, Mathematics"
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="">Хичээлийн түвшин</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.level || ""}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="price"
              placeholder="Амархан, хэцүү, ..."
              className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="">Үзүүлэн бичлэгийн линк</label>
            <input
              type="file"
              accept="video/*"
              id="video"
              className="hidden"
              onChange={(e) => setDemoVideoFile(e.target.files[0])}
            />
            <label
              className="w-full min-h-[40px] border-white p-3 flex items-center text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
              htmlFor="video"
            >
              {demoVideoFile ? demoVideoFile?.name : "Бичлэг оруулах"}
            </label>
            {/* <div onClick={() => widgetRef.current.open()}>Upload</div> */}
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] border-white p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-white">
                Drag and Drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
