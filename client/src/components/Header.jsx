import { useState } from "react";
import { Link } from "react-router-dom";
import NavItems from "../utils/NavItems";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import avatar from "../images/avatar.png";

const Header = ({ open, setOpen, activeItem, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const { user } = useSelector((state) => state.auth);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }
  const handleClose = (e) => {
    if (e.target.id === "screen") {
      setOpenSideBar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "bg-opacity-50 bg-gradient-to-b from-gray-900 to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b border-[#ffffff1c] h-[80px] z-[80] shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                to="/"
                className={`text-[25px] font-Poppins font-[500] text-white`}
              >
                ELearning
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer text-white"
                  onClick={() => setOpenSideBar(true)}
                />
              </div>

              {user ? (
                <>
                  {user.role === "user" && (
                    <Link to="/profile">
                      <img
                        src={user.avatar ? user.avatar.url : avatar}
                        alt=""
                        width={30}
                        height={30}
                        style={{
                          border:
                            activeItem === 5 ? "2px solid #ffc107" : "none",
                        }}
                        className="w-[30px] h-[30px] rounded-full"
                      />
                    </Link>
                  )}
                  {user.role === "admin" && (
                    <Link to="/admin">
                      <img
                        src={user.avatar ? user.avatar.url : avatar}
                        alt=""
                        width={30}
                        height={30}
                        style={{
                          border:
                            activeItem === 5 ? "2px solid #ffc107" : "none",
                        }}
                        className="w-[30px] h-[30px] rounded-full"
                      />
                    </Link>
                  )}
                </>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="hidden 800px:block cursor-pointer text-white"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
        {openSideBar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] bg-[unset]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[99999999] h-screen bg-slate-900 bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 text-white"
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-white">
                Copyright © 2023 Elearning
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Signup}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
