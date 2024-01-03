"use client";
import React from "react";
import { useState } from "react";
import { useGetAllUsersQuery } from "../../features/user/userApi";
import { useEffect } from "react";
import UserItemList from "./UserListItem";
import AdminChargeModal from "./AdminChargeModal";

const AdminGetAllUsers = () => {
  const { isLoading, data } = useGetAllUsersQuery();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    if (!isLoading) {
      setUsers(data?.users);
      console.log(data);
    }
  }, [data, isLoading]);
  return (
    <div className="w-[80%] m-auto">
      <br />
      <div className="mb-12 border-0 min-h-[35vh] w-full">
        {users &&
          users.map((item, index) => (
            <UserItemList
              item={item}
              key={index}
              setUserId={setUserId}
              open={open}
              setOpen={setOpen}
            />
          ))}
      </div>
      {open && (
        <AdminChargeModal open={open} setOpen={setOpen} userId={userId} />
      )}
    </div>
  );
};

export default AdminGetAllUsers;
