"use client";
import React from "react";
import coverDefault from "../../images/109700818_p0.png";
import avatarDefault from "../../images/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
const ProfileImage = ({
  user,
  updateAvatar,
  imageHandler,
  coverImageHandler,
  logOutHandler,
}) => {
  return (
    <div className="w-[100%] flex">
      <div className="w-[100%]">
        <div className=" relative w-[100%]">
          <img
            src={coverDefault}
            className="w-[100%] h-[25rem] object-cover bg-center"
            alt=""
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={coverImageHandler}
            accept="image/png, image/jpg, image/jpeg, image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[40px] h-[40px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
        <div className="w-[85%] flex mx-auto mt-[-80px] justify-between align-bottom">
          <div className="flex flex-row align-middle justify-start">
            <div className="flex relative w-fit rounded-[50%]">
              <div className="relative inline-flex items-center justify-center text-center align-middle overflow-hidden rounded-full h-[160px] w-[160px] min-w-[160px] bg-gradient-to-b from-gray-900 to-black">
                <img
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  alt=""
                  className="h-[150px] w-[150px] min-w-[150px] rounded-full object-cover bg-center"
                />
              </div>
              <input
                type="file"
                name=""
                id="avatar"
                className="hidden"
                onChange={imageHandler}
                accept="image/png, image/jpg, image/jpeg, image/webp"
              />
              <label htmlFor="avatar">
                <div className="w-[40px] h-[40px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                  <AiOutlineCamera size={20} className="z-1" />
                </div>
              </label>
            </div>
            <div className="flex relative">
              <p className="ml-5 text-[50px] flex items-end">{user.name}</p>
            </div>
          </div>
          <div className="flex flex-row align-middle justify-end">
            <div className="flex relative items-end">
              <div className="mb-4 w-[150px] h-[40px] border border-[#37a39a] justify-center text-[#fff] rounded-[3px] mt-8 cursor-pointer flex items-center">
                Хувийн мэдээлэл
              </div>
              <div className="mb-4 ml-5 w-[150px] h-[40px] border border-[#37a39a] justify-center text-[#fff] rounded-[3px] mt-8 cursor-pointer flex items-center"
              onClick={() => logOutHandler()}>
                Гарах
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
