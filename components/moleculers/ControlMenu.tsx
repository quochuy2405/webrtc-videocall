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
      <div className="p-2 bg-[#E7E3FA] rounded-lg cursor-pointer">
         <MdKeyboardVoice color ='#8871E' size={'25px'}  />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg cursor-pointer">
         <MdOutlineVolumeOff color ='#8871E' size={'25px'}  />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg cursor-pointer" >
        <IoVideocam color ='#8871E' size={'25px'}  />
      </div>
      <div className="p-2 text-center bg-[#8871E6] w-[12%] rounded-lg cursor-pointer grid place-items-center">
        <IoCall color ='white' size={'25px'}  />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg cursor-pointer">
         <LuPencilLine color ='#8871E' size={'25px'}  />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg cursor-pointer">
         <MdFullscreen color ='#8871E' size={'25px'}  />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg cursor-pointer ">
        <IoIosMore color ='#8871E' size={'25px'}  />
      </div>
    </div>
  );
}

export default ControlMenu;
