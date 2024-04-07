import React from "react";

const ChatBar = () => {
  return (
    <div className="flex flex-[0.3] flex-col gap-4 rounded-md bg-[#E9E9FA] p-5">
      <div className="flex w-full flex-1 rounded-lg bg-white"></div>
      <div className="flex gap-4">
        <div className=" rounded-lg p-2 text-[#BCBCD3]">Participants</div>
      </div>
      <div>
        <div className="flex gap-2">
          <input
            className="h-10 rounded-md border border-black p-4"
            type="text"
            id="chatbox"
            placeholder="Type a message ..."
          />
          <div className=" rounded-lg bg-[#8871E6] p-2 text-white">Send</div>
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
