import React from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

ControlMenu.propTypes = {};

function ControlMenu(props) {
  return (
    <div className="flex justify-center p-5 bg-[#F5F5FD] gap-[3%]">
      <div className="p-2 bg-[#E7E3FA] rounded-lg">
        <KeyboardVoiceIcon fontSize="large" style={{ color :'#8871E6' }} />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg">
        <VolumeOffIcon fontSize="large" style={{ color :'#8871E6' }} />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg">
        <VideocamIcon fontSize="large" style={{ color :'#8871E6' }} />
      </div>
      <div className="p-2 text-center bg-[#8871E6] w-[12%] rounded-lg">
        <CallIcon fontSize="large" style={{ color :'white' }} />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg">
        <DriveFileRenameOutlineIcon fontSize="large" style={{ color :'#8871E6' }} />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg">
        <FullscreenIcon fontSize="large" style={{ color :'#8871E6' }} />
      </div>
      <div className="p-2 bg-[#E7E3FA] rounded-lg">
        <MoreHorizIcon fontSize="large" style={{ color :'#8871E6' }} />
      </div>
    </div>
  );
}

export default ControlMenu;
