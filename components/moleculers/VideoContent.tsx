"use client";
import React, { MutableRefObject, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ControlMenu from "./ControlMenu";
interface VideoContentProps {
  paticipants: MutableRefObject<(HTMLVideoElement | null)[]>;
  self: MutableRefObject<HTMLVideoElement | null>;
}
const VideoContent: React.FC<VideoContentProps> = ({ paticipants, self }) => {
  const refVideo = useRef<HTMLVideoElement | null>(null);
  const [isCamera, setIsCamera] = useState(true);
  const [isMuteMic, setIsMuteMic] = useState(false);
  const [isMuteSpeaker, setIsMuteSpeaker] = useState(false);

  const mediaStreamRef = useRef<MediaStream | null>(null);

  const toggleCamera = async () => {
    if (mediaStreamRef.current) {
      const tracks = mediaStreamRef.current.getVideoTracks();
      tracks.forEach((track) => {
        track.enabled = !isCamera;
      });

      setIsCamera(!isCamera);
    }
  };

  const toggleMic = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !isMuteMic;
      });
      setIsMuteMic(!isMuteMic);
    }
  };

  const toggleSpeaker = () => {
    setIsMuteSpeaker(!isMuteSpeaker); // Chỉ làm thay đổi trạng thái, không có API để tắt loa trực tiếp trong trình duyệt.
    // Tuy nhiên, bạn có thể tắt loa bằng cách kiểm soát âm lượng của âm thanh hoặc dùng api media session, nhưng chúng không tắt loa mà chỉ giảm âm lượng hoặc tạm dừng phát.
  };

  return (
    <div className="flex h-full w-full flex-1 gap-4 overflow-hidden">
      <div className="flex h-full w-full flex-1 flex-col">
        <div className="flex flex-1 flex-wrap-reverse gap-4 overflow-y-auto rounded-md bg-black p-5">
          <div className="h-[48%] min-w-[30%] flex-1 rounded-md bg-red-400">
            <video ref={self} autoPlay playsInline></video>
          </div>
          {[1, 2, 3, 4].map((item, i) => {
            return (
              <div
                key={item}
                className="flex h-[48%] min-w-[30%] flex-1 rounded-md bg-red-400"
              >
                <video
                  ref={(ref) => {
                    paticipants.current[i] = ref;
                  }}
                  autoPlay
                  playsInline
                ></video>
              </div>
            );
          })}
        </div>
        <ControlMenu
          isCamera={isCamera}
          isMuteMic={isMuteMic}
          onToggleCamera={toggleCamera}
          onToggleMic={toggleMic}
          onToggleSpeaker={toggleSpeaker}
        />
      </div>
      <ChatBar />
    </div>
  );
};

export default VideoContent;
