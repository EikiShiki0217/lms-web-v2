import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      className={`bg-no-repeat bg-gradient-to-b from-gray-900 to-black duration-300 w-full`}
    >
      <Outlet />
    </div>
  );
};
export default Layout;
