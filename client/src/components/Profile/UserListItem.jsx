"use client";
import React from "react";

const UserItemList = ({ item, setUserId, open, setOpen }) => {
  return (
    <div className="w-full min-h-[50px] items-center bg-slate-500 bg-opacity-20 backdrop-blur border border-[#ffffff1d] shadow-[bg-slate-700] rounded-lg p-3 shadow-sm flex justify-between">
      <div className="flex justify-start items-center">
        <img
          src={item.avatar.url}
          width={50}
          height={50}
          className="rounded-[50%] object-contain"
          alt=""
        />
        <div className="flex justify-between w-[500px]">
          <div className="flex flex-col justify-between ml-5">
            <h1 className="font-Poppins text-[16px] text-[#fff]">
              {item.name}
            </h1>
            <h1 className="font-Poppins text-[16px] text-[#ffffff9f]">
              {item.email}
            </h1>
          </div>
          <div className="flex flex-col justify-between items-end ml-5">
            <h1 className="font-Poppins text-[16px] text-[#fff]">
              Данс: {item.unit}₮
            </h1>
            <h1 className="font-Poppins text-[16px] text-[#ffffff9f]">
              ID: {item.userId}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div
          onClick={() => {
            setOpen(true);
            setUserId(item.userId);
          }}
          className="mr-5 flex flex-row justify-center items-center py-3 px-6 rounded-full min-h-[45px]  text-[16px] font-semibold !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]"
        >
          Данс цэнэглэх
        </div>
      </div>
    </div>
  );
};

export default UserItemList;
