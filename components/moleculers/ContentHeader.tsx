import React from "react";
import { MdFiberManualRecord } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BiSolidWidget } from "react-icons/bi";
import { FaSquare } from "react-icons/fa";
import { BsFillGrid1X2Fill } from "react-icons/bs";



ContentHeader.propTypes = {};

function ContentHeader() {
  return (
    <div className="flex h-[60px] items-center justify-between rounded-md bg-[#F5F5FD] p-4">
      <h2 className="text-xl font-bold">Preparing for the holiday</h2>
      <div className="flex w-1/2 justify-between">
        <div className="flex justify-between">
          <div className="flex">
            <span className="mr-[6%] flex rounded-2xl border-2 border-red-400 p-2 text-sm font-bold items-center">
              <MdFiberManualRecord color='rgba(255, 0, 0, 0.5)'/>
              02:22:05
            </span>
            <span className=" m-auto cursor-pointer rounded-md bg-red-400 px-2 py-2 text-xs font-bold text-white hover:bg-red-500">
              Leave
            </span>
          </div>
          <div></div>
        </div>
        <div className="flex min-w-[16%] gap-[7%] items-center">
          <FaSquare size={'25px'}/>
          <BsFillGrid1X2Fill size={'20px'}/>
          <BiSolidWidget size={'25px'}/>
        </div>
      </div>
      <div className="flex items-center min-w-[4%]">
        <span className="m-auto rounded-md bg-[#E9E9FA] px-1 py-1">23</span>
        <MdPersonAddAlt1 size={'25px'} />
      </div>
    </div>
  );
}

export default ContentHeader;
