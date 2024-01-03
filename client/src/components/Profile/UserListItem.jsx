"use client";
import React from "react";
import AdminChargeModal from "./AdminChargeModal";

const UserItemList = ({ item, isProfile, open, setOpen }) => {
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
          onClick={() => setOpen(true)}
          className="mr-5 flex flex-row justify-center items-center py-3 px-6 rounded-full min-h-[45px]  text-[16px] font-semibold !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]"
        >
          Данс цэнэглэх
        </div>
        {open && (
          <>
            {open && (
              <AdminChargeModal
                open={open}
                setOpen={setOpen}
                userId={item.userId}
              />
            )}
          </>
        )}
      </div>
      {/* <div className="w-full flex items-center justify-between pt-2">
        <Ratings rating={item.rating} />
        <h5 className={`text-[#fff] ${isProfile && "hidden 800px:inline"}`}>
          {item.purchased} Students
        </h5>
      </div>
      <div className="w-full flex items-center justify-between pt-3">
        <div className="flex">
          <h3 className="text-[#fff]">
            {item.price === 0 ? "Free" : item.price + "₮"}
          </h3>
          <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-[#fff]">
            {item.estimitedPrice}₮
          </h5>
        </div>
        <div className="flex items-center pb-3">
          <AiOutlineUnorderedList size={20} fill="#fff" />
          <h5 className="pl-2 text-[#fff]">
            {item.courseData?.length} Lectures
          </h5>
        </div>
      </div> */}
    </div>
  );
};

export default UserItemList;
