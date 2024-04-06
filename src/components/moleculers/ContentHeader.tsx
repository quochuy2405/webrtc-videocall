import React from "react";
import WidgetsIcon from "@mui/icons-material/Widgets";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

ContentHeader.propTypes = {};

function ContentHeader(props) {
  return (
    <div className="flex justify-between bg-[#F5F5FD] rounded-md p-4 items-center">
      <div>Preparing for the holiday</div>
      <div className="flex w-1/2 justify-between">
        <div className="flex justify-between">
          <div className='flex'>
            
            <span className="border-2 border-red-400 rounded-2xl p-2 mr-[6%] flex">
            <FiberManualRecordIcon sx={{ color: 'rgba(255, 0, 0, 0.5)' }}/>
              02:22:05
            </span>
            <span className="bg-[#E9E9FA] rounded-md px-1 py-1 m-auto">
              Leave
            </span>
          </div>
          <div></div>
        </div>
        <div>
          <WidgetsIcon />
          <WidgetsIcon />
          <WidgetsIcon />
        </div>
      </div>
      <div>
        <span className="bg-[#E9E9FA] rounded-md px-1 py-1 m-auto">23</span>
        <WidgetsIcon />
      </div>
    </div>
  );
}

export default ContentHeader;
