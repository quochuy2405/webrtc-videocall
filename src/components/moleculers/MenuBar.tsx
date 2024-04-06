import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LogoutIcon from '@mui/icons-material/Logout';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';

MenuBar.propTypes = {};

function MenuBar(props) {
  return (
    <div className="bg-[#E9E9FA] w-[10%] flex flex-col items-center">
     <div>
     <div>Avatar</div>
      <div className="flex flex-col">
        <FiberManualRecordIcon />
        <FiberManualRecordIcon />
        <FiberManualRecordIcon />
        <FiberManualRecordIcon />
      </div>
     </div>
      <div>
        <div>
          <LogoutIcon />
        </div>
        <div>
          <NightlightRoundIcon />
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
