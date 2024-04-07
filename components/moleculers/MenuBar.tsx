import React from "react";

const MenuBar = () => {
  return (
    <div className="flex w-[10%] flex-col items-center bg-[#E9E9FA]">
      <div>
        <div>Avatar</div>
        <div className="flex flex-col">
          {/* <FiberManualRecordIcon />
        <FiberManualRecordIcon />
        <FiberManualRecordIcon />
        <FiberManualRecordIcon /> */}
        </div>
      </div>
      <div>
        <div>{/* <LogoutIcon /> */}</div>
        <div>{/* <NightlightRoundIcon /> */}</div>
      </div>
    </div>
  );
};

export default MenuBar;
