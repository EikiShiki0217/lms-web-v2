"use client";
import React, { useState } from "react";
import avatarDefault from "../../images/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import UserModal from "./UserModal";
import Edit from "./Edit";
import Charge from "./Charge";
const ProfileImage = ({
  user,
  imageHandler,
  coverImageHandler,
  logOutHandler,
}) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("");
  return (
    <div className="w-[100%] flex">
      <div className="w-[100%]">
        <div className=" relative w-[100%]">
          <img
            src={user.cover ? user.cover.url : ""}
            className="w-[100%] h-[25rem] object-cover bg-center"
            alt=""
          />
          <input
            type="file"
            name="cover"
            id="cover"
            className="hidden"
            onChange={coverImageHandler}
            accept="image/png, image/jpg, image/jpeg, image/webp"
          />
          <label htmlFor="cover">
            <div className="w-[40px] h-[40px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
        <div className="w-[95%] flex mx-auto mt-[-80px] justify-between align-bottom">
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
                name="avatar"
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
            <div className="flex relative flex-col justify-end">
              <p className="ml-5 text-[30px] flex items-end">{user.name}</p>
              <p className="ml-5 text-[18px] mb-1 text-[#ffffff8b] flex items-end">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex flex-row align-middle justify-end">
            <div className="flex relative items-end">
              <div className="flex flex-col items-end">
                <p className="ml-5 text-[17px] mb-1 flex items-end">
                  Данс: {user.userId}
                </p>
                <p className="ml-5 text-[17px] mb-2 flex items-end">
                  Үлдэгдэл: {user.unit}
                </p>
              </div>
              <div
                className="ml-5 mb-4 p-5 h-[40px] border border-[#37a39a] justify-center text-[#fff] rounded-[3px] mt-8 cursor-pointer flex items-center"
                onClick={() => {
                  setOpen(true);
                  setRoute("Charge");
                }}
              >
                Цэнэглэх
              </div>
              <div
                className="ml-5 mb-4 p-5 h-[40px] border border-[#37a39a] justify-center text-[#fff] rounded-[3px] mt-8 cursor-pointer flex items-center"
                onClick={() => {
                  setOpen(true);
                  setRoute("Edit");
                }}
              >
                Мэдээлэл засах
              </div>
              <div
                className="mb-4 ml-5 p-5 h-[40px] border border-[#37a39a] justify-center text-[#fff] rounded-[3px] mt-8 cursor-pointer flex items-center"
                onClick={() => logOutHandler()}
              >
                Гарах
              </div>
            </div>
          </div>
        </div>
      </div>
      {route === "Charge" && (
        <>
          {open && (
            <UserModal
              open={open}
              user={user}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Charge}
            />
          )}
        </>
      )}
      {route === "Edit" && (
        <>
          {open && (
            <UserModal
              open={open}
              user={user}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Edit}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProfileImage;
