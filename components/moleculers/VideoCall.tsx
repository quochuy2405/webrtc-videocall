import React from "react";
import ControlMenu from "./ControlMenu";

VideoCall.propTypes = {};

function VideoCall() {
  return (
    <div className="">
      <div className="flex flex-wrap gap-[2%]">
        <div className="h-[300px] w-[40%] rounded-lg border-2">123</div>
        <div className="h-[300px] w-[40%] rounded-lg border-2">23</div>
        <div className="h-[300px] w-[30%] rounded-lg border-2">34</div>
        <div className="h-[300px] w-[30%] rounded-lg border-2">45</div>
        <div className="h-[300px] w-[30%] rounded-lg border-2">56</div>
      </div>
      <div>{/* <ControlMenu /> */}</div>
    </div>
  );
}

export default VideoCall;
