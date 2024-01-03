import React, { useState } from "react";
import Header from "../../components/Header.jsx";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer.jsx";
import AdminProfile from "../../components/Profile/AdminProfile.jsx";

const Admin = () => {
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
        <AdminProfile user={user} />
        <Footer />
      </div>
    </div>
  );
};

export default Admin;
