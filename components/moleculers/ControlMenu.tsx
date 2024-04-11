"use client";
import React from "react";
import { BsMicFill, BsMicMuteFill } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { IoCall, IoVideocam, IoVideocamOff } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { MdFullscreen, MdOutlineVolumeOff } from "react-icons/md";

interface Props {
  onToggleCamera: () => void;
  onToggleMic: () => void;
  onToggleSpeaker: () => void;
  isCamera: boolean;
  isMuteMic: boolean;
}

const ControlMenu: React.FC<Props> = ({
  onToggleCamera,
  onToggleMic,
  onToggleSpeaker,
  isCamera,
  isMuteMic,
}) => {
  return (
    <div className="flex justify-center gap-[3%] bg-[#F5F5FD] p-5">
      <div
        className="cursor-pointer rounded-lg bg-[#E7E3FA] p-2"
        onClick={onToggleMic}
      >
        {!isMuteMic && <BsMicFill color="#8871E" size={"25px"} />}
        {isMuteMic && <BsMicMuteFill color="#8871E" size={"25px"} />}
      </div>
      <div
        className="cursor-pointer rounded-lg bg-[#E7E3FA] p-2"
        onClick={onToggleSpeaker}
      >
        {<MdOutlineVolumeOff color="#8871E" size={"25px"} />}
        {/* {!isMuteMic && <MdOutlineVolumeMute color="#8871E" size={"25px"} />} */}
      </div>
      <div
        className="cursor-pointer rounded-lg bg-[#E7E3FA] p-2"
        onClick={onToggleCamera}
      >
        {!isCamera && <IoVideocamOff color="#8871E" size={"25px"} />}
        {isCamera && <IoVideocam color="#8871E" size={"25px"} />}
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
