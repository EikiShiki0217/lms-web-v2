"use client";
import React from "react";

export const navItemsData = [
  {
    name: "Хичээлүүд",
    active: 0,
  },
  {
    name: "Хэрэглэгчид",
    active: 1,
  },
];

const AdminMenu = ({ active, setActive }) => {
  return (
    <div className="w-[50%] mx-auto flex justify-between">
      {navItemsData &&
        navItemsData.map((item, index) => (
          <span
            key={index}
            className={`${
              active === index ? "text-[#37a39a]" : "text-white"
            }  text-[18px] px-6 font-Poppins font-[400] cursor-pointer`}
            onClick={() => setActive(item.active)}
          >
            {item.name}
          </span>
        ))}
    </div>
  );
};

export default AdminMenu;
