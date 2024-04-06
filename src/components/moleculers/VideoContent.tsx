import React from "react";
import VideoCall from "./VideoCall";
import ChatBar from "./ChatBar";

VideoContent.propTypes = {};

function VideoContent(props) {
  return (
    <div className="flex w-full gap-[4%] my-5">
      <div className="w-[65%]">
        <VideoCall />
      </div>
      <div className="grow">
        <ChatBar />
      </div>
    </div>
  );
}

export default VideoContent;
