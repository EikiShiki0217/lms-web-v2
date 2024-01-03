"use client";
import React, { useState } from "react";
import { useLogOutQuery } from "../../features/auth/authApi.js";
import { useLoadUserQuery } from "../../app/api/apiSlice.js";
import ProfileImage from "./ProfileImage.jsx";
import { useEffect } from "react";
import { useUpdateAvatarMutation } from "../../features/user/userApi.js";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu.jsx";
import AdminAllCourses from "./AdminAllCourse.jsx";
import AdminGetAllUsers from "./AdminGetAllUsers.jsx";

const AdminProfile = ({ user }) => {
  const [active, setActive] = useState(0);
  const [logout, setLogout] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });
  const { isSuccess: success } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const navigate = useNavigate();

  const imageHandler = async (e) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  const coverImageHandler = async (e) => {
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        await updateAvatar(avatar);
        setLoadUser(true); // Trigger loadUserQuery after the mutation is successful
      }
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
    }
    if (success) {
      navigate("/");
    }
    if (error) {
      console.log(error);
    }
    if (isSuccess) {
      toast.success("Profile updated");
    }
  }, [error, isSuccess, loadUser, success, navigate, logout]);

  const logOutHandler = async () => {
    setLogout(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLogout(false);
  };

  return (
    <div>
      <Toaster />
      <div className="w-[85%] flex mx-auto mt-[50px] mb-[50px]">
        <ProfileImage
          user={user}
          updateAvatar={updateAvatar}
          imageHandler={imageHandler}
          coverImageHandler={coverImageHandler}
          logOutHandler={logOutHandler}
        />
      </div>
      <div>
        <AdminMenu active={active} setActive={setActive} />
        <div>
          {active === 0 && <AdminAllCourses />}
          {active === 1 && <AdminGetAllUsers />}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
