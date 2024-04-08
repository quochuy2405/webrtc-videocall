import React from "react";
import { MdFiberManualRecord } from "react-icons/md";


ContentHeader.propTypes = {};

function ContentHeader() {
  return (
    <div className="flex h-[60px] items-center justify-between rounded-md bg-[#F5F5FD] p-4">
      <h2 className="text-sm font-bold">Preparing for the holiday</h2>
      <div className="flex w-1/2 justify-between">
        <div className="flex justify-between">
          <div className="flex">
            <span className="mr-[6%] flex rounded-2xl border-2 border-red-400 p-2 text-sm font-bold">
              <MdFiberManualRecord color='rgba(255, 0, 0, 0.5)'/>
              02:22:05
            </span>
            <span className=" m-auto cursor-pointer rounded-md bg-red-400 px-2 py-2 text-xs font-bold text-white hover:bg-red-500">
              Leave
            </span>
          </div>
          <div></div>
        </div>
        <div>
          {/* <WidgetsIcon />
          <WidgetsIcon />
          <WidgetsIcon /> */}
        </div>
      </div>
      <div>
        <span className="m-auto rounded-md bg-[#E9E9FA] px-1 py-1">23</span>
        {/* <WidgetsIcon /> */}
      </div>
    </div>
  );
}

export default ContentHeader;
