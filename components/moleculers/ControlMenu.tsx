import React from "react";
import { MdKeyboardVoice } from "react-icons/md";
import { MdOutlineVolumeOff } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { MdFullscreen } from "react-icons/md";
import { IoIosMore } from "react-icons/io";

ControlMenu.propTypes = {};

function ControlMenu() {
  return (
    <div className="flex justify-center p-5 bg-[#F5F5FD] gap-[3%]">
      <div className="p-2 bg-[#E7E3FA] rounded-lg">
        <MdKeyboardVoice color ='#8871E' />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg">
        <MdOutlineVolumeOff color ='#8871E' />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg">
        <IoVideocam color ='#8871E' />
      </div>
      <div className="p-2 text-center bg-[#8871E6] w-[12%] rounded-lg">
        <IoCall color ='white' />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg">
        <LuPencilLine color ='#8871E'  />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg">
        <MdFullscreen color ='#8871E' />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg">
        <IoIosMore color ='#8871E'  />
      </div>
    </div>
  );
}

export default ControlMenu;
