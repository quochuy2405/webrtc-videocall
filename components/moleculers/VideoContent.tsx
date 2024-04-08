import React from "react";
import ChatBar from "./ChatBar";
import ControlMenu from "./ControlMenu";

const VideoContent = () => {
  return (
    <div className="flex w-full flex-1 gap-4 overflow-hidden">
      <div className="w-full h-[91%]">
        <div className="flex h-full flex-1 flex-wrap-reverse gap-4 overflow-y-auto rounded-md bg-black p-5">
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <div
                key={item}
                className="min-h-[45%] min-w-[30%] flex-1 rounded-md bg-red-400"
              ></div>
            );
          })}
        </div>
        <div>
          <ControlMenu />
        </div>
      </div>
      <ChatBar />
    </div>
  );
};

export default VideoContent;
