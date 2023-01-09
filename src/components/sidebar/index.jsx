import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HiBars3BottomRight,
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineCube,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import {
  toggleSidebar,
  restSidebar,
  toggleSidebarSelector,
} from "../../app/toogleSidebarSlice";

const Sidebar = () => {
  const sidebarStatus = useSelector(toggleSidebarSelector);
  const dispatch = useDispatch();
  window.onresize = resize;

  function resize() {
    dispatch(restSidebar());
  }

  return (
    <div
      className={`w-[250px] h-screen fixed z-10 bg-primary transition-all ${
        sidebarStatus ? "ml-[-200px] lg:ml-[0px]" : "lg:ml-[-200px]"
      } `}
    >
      <div
        className={`text-center p-4 flex items-center justify-between ${
          sidebarStatus && "pr-[10px]"
        }`}
      >
        <h3 className="text-3xl font-bold text-white">BIZEN</h3>
        <HiBars3BottomRight
          className="h-8 w-8 text-white cursor-pointer"
          onClick={() => dispatch(toggleSidebar())}
        />
      </div>
      <div className="pl-4 mt-8">
        <ul className="font-semibold text-white flex flex-col gap-2 sidebar_menu">
          <li
            className={`rounded-l-md hover:bg-secondary cursor-pointer transition-all ${
              sidebarStatus && "justify-between flex-row-reverse"
            }`}
          >
            <NavLink
              to="/"
              className="rounded-l-md flex items-center gap-2 h-full w-full py-4 pl-2"
            >
              <HiOutlineSquares2X2 className="h-6 w-6" />
              <span className="">Dashboard</span>
            </NavLink>
          </li>
          <li
            className={`rounded-l-md hover:bg-secondary cursor-pointer transition-all ${
              sidebarStatus && "justify-between flex-row-reverse"
            }`}
          >
            <NavLink
              to="/users"
              className="rounded-l-md flex items-center gap-2 h-full w-full py-4 pl-2"
            >
              <HiOutlineUsers className="h-6 w-6" />
              <span className="">Users</span>
            </NavLink>
          </li>
          <li
            className={`rounded-l-md hover:bg-secondary cursor-pointer transition-all ${
              sidebarStatus && "justify-between flex-row-reverse"
            }`}
          >
            <NavLink
              to="/products"
              className="rounded-l-md flex items-center gap-2 h-full w-full py-4 pl-2"
            >
              <HiOutlineCube className="h-6 w-6" />
              <span className="">Products</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
