import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="mt-8">
        <div className="border border-[#ffffff1e]"></div>
        <br />
        <div className="w-[90%] 800px:w-full 800px:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 text-center">
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600]">About</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    className="text-base text-gray-300 hover:text-white"
                    to="/about"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base text-gray-300 hover:text-white"
                    to="/privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base text-gray-300 hover:text-white"
                    to="/faq"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600]">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    className="text-base text-gray-300 hover:text-white"
                    to="/courses"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base text-gray-300 hover:text-white"
                    to="/profile"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base text-gray-300 hover:text-white"
                    to="/course-dashboard"
                  >
                    Course Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600]">Social Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    className="text-base text-gray-300 hover:text-white"
                    to="https://www.youtube.com/channel/UCHz6Sne9splmvm-q2w1_HWQ"
                  >
                    Youtube
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base text-gray-300 hover:text-white"
                    to="https://www.instagram.com/shahriar_sajeeb_/"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base text-gray-300 hover:text-white"
                    to="https://www.github.com/shahriarsajeeb"
                  >
                    github
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <p className="text-center">
            Copyright © 2023 Becodemy | All Rights Reserved
          </p>
          <br />
        </div>
      </footer>
    </>
  );
};

export default Footer;
