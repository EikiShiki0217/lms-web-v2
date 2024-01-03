"use client"
import React from "react";
const Charge = ({ user, setOpen }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-[80%] flex justify-between m-auto">
        <p className="text-[20px] text-white">Дансны дугаар:</p>
        <p className="text-[20px] text-white">5030726280</p>
      </div>
      <div className="w-[80%] flex justify-between m-auto mt-4">
        <p className="text-[20px] text-white">Гүйлгээний утга:</p>
        <p className="text-[20px] text-white">{user.userId}</p>
      </div>
    </div>
  );
};

export default Charge;
