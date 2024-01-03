"use client";
import React, { useState } from "react";
import Header from "../../components/Header.jsx";
import Profile from "../../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="w-full overflow-hidden">
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={5}
          route={route}
          setRoute={setRoute}
        />
        <Profile user={user} />
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
