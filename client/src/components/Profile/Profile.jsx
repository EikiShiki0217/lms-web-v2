"use client";
import React, { useState } from "react";
import { useLogOutQuery } from "../../features/auth/authApi.js";
import { useLoadUserQuery } from "../../app/api/apiSlice.js";
import ProfileImage from "./ProfileImage.jsx";
import UserCoursesMenu from "./UserCourses.jsx";
import { useEffect } from "react";
import {
  useUpdateAvatarMutation,
  useUpdateCoverMutation,
} from "../../features/user/userApi.js";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MyCourses from "./MyCourses.jsx";
import PurchasedCourses from "./PurchasedCourses.jsx";

const Profile = ({ user }) => {
  const [active, setActive] = useState(0);
  const [logout, setLogout] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [updateCover, { isSuccess: coverSuccess, error: errorCover }] =
    useUpdateCoverMutation();
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
        const cover = fileReader.result;
        updateCover(cover);
      }
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
      setLoadUser(true);
    }
    if (coverSuccess) {
      window.location.reload();
      setLoadUser(true);
    }
    if (success) {
      navigate("/");
    }
    if (error) {
      console.log(error);
    }
    if (errorCover) {
      console.log(error);
    }
    if (loadUser) {
      setLoadUser(false);
    }
  }, [
    error,
    loadUser,
    success,
    navigate,
    logout,
    errorCover,
    isSuccess,
    coverSuccess,
  ]);

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
          imageHandler={imageHandler}
          coverImageHandler={coverImageHandler}
          logOutHandler={logOutHandler}
        />
      </div>
      <div>
        <UserCoursesMenu active={active} setActive={setActive} />
        <div>
          {active === 0 && <MyCourses />}
          {active === 1 && <PurchasedCourses />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
