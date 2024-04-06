import React from 'react'

const ChatBar = () => {
  return (
    <div className="rounded-md bg-[#E9E9FA] p-5">
      <div className="flex w-full bg-white rounded-lg">
        <button className="w-1/2 p-2 bg-[#8871E6] text-white rounded-lg">
          Message
        </button>
        <button className="w-1/2 p-2 text-[#BCBCD3] rounded-lg">
          Participants
        </button>
      </div>
      <div></div>
      <div>
        <div>
          <input
            type="text"
            id="chatbox"
            placeholder="Type a message ..."
            className="p-3 w-full absolute"
          />
          <div className=" relative bottom-[-10px]">
            {/* <SendIcon /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBar
