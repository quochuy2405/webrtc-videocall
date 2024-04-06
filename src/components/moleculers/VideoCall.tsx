import React from "react";
import ControlMenu from "./ControlMenu";

VideoCall.propTypes = {};

function VideoCall() {
  return (
    <div className="">
      <div className="flex flex-wrap gap-[2%]">
        <div className="w-[40%] h-[300px] rounded-lg border-2">123</div>
        <div className="w-[40%] h-[300px] rounded-lg border-2">23</div>
        <div className="w-[30%] h-[300px] rounded-lg border-2">34</div>
        <div className="w-[30%] h-[300px] rounded-lg border-2">45</div>
        <div className="w-[30%] h-[300px] rounded-lg border-2">56</div>
      </div>
      <div>
        <ControlMenu />
      </div>
    </div>
  );
}

export default VideoCall;
