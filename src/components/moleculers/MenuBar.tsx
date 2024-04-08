import React from "react";
import { GoHome } from "react-icons/go";
import { IoVideocam } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";

MenuBar.propTypes = {};

function MenuBar() {
  return (
    <div className="bg-[#E9E9FA] w-[10%] flex flex-col items-center">
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
        <div>
          <MdDarkMode />
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
