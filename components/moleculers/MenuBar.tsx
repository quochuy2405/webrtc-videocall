import React from "react";
import { GoHome } from "react-icons/go";
import { IoVideocam } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";

const MenuBar = () => {
  return (
    <div className="flex w-[10%] flex-col items-center bg-[#E9E9FA]">
      <div>
        <div>Avatar</div>
        <div className="flex flex-col">
          <GoHome />
          <IoVideocam />
          <FaRegCalendarAlt />
          <IoNotifications />
          <IoMdSettings />
        </div>
      </div>
      <div>
        <div>
          <IoLogOutOutline />
        </div>
        <div><MdDarkMode /></div>
      </div>
    </div>
  );
};

export default MenuBar;
