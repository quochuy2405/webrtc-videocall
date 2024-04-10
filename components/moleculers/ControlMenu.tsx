"use client";
import React, { useState } from "react";
import { MdKeyboardVoice } from "react-icons/md";
import { MdOutlineVolumeOff } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { MdFullscreen } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { IoVideocamOff } from "react-icons/io5";

interface Props {
  onOpenCam: (open: boolean) => void;
}

const ControlMenu: React.FC<Props> = ({ onOpenCam }) => {
  const [isOpenCam, setIsOpenCam] = useState(false);

  return (
    <div className="flex justify-center gap-[3%] bg-[#F5F5FD] p-5">
      <div className="cursor-pointer rounded-lg bg-[#E7E3FA] p-2">
        <MdKeyboardVoice color="#8871E" size={"25px"} />
      </div>
      <div className="cursor-pointer rounded-lg bg-[#E7E3FA] p-2">
        <MdOutlineVolumeOff color="#8871E" size={"25px"} />
      </div>
      <div
        className="cursor-pointer rounded-lg bg-[#E7E3FA] p-2"
        onClick={() => {
          setIsOpenCam(!isOpenCam);
          onOpenCam(isOpenCam);
        }}
      >
        {isOpenCam ?
        <IoVideocamOff color="#8871E" size={"25px"} /> : <IoVideocam color="#8871E" size={"25px"}/>}
      </div>
      <div className="grid w-[12%] cursor-pointer place-items-center rounded-lg bg-[#8871E6] p-2 text-center">
        <IoCall color="white" size={"25px"} />
      </div>
      <div className="cursor-pointer rounded-lg bg-[#E7E3FA] p-2">
        <LuPencilLine color="#8871E" size={"25px"} />
      </div>
      <div className="cursor-pointer rounded-lg bg-[#E7E3FA] p-2">
        <MdFullscreen color="#8871E" size={"25px"} />
      </div>
      <div className="cursor-pointer rounded-lg bg-[#E7E3FA] p-2 ">
        <IoIosMore color="#8871E" size={"25px"} />
      </div>
    </div>
  );
};

export default ControlMenu;
