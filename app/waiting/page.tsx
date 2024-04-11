"use client";

import { ControlMenu } from "@/components/moleculers";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";


const Waiting = () => {
  const refVideo = useRef<HTMLVideoElement | null>(null);
  const [isOpenCam, setIsOpenCam] = useState(false);
  const webcamRef = React.useRef(null);

  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const source = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (refVideo.current) refVideo.current.srcObject = source;
      } catch (error) {
        console.log(error);
      }
    };

    initializeCamera();
  }, []);

  const onOpenCam = (camState: boolean) => {
    setIsOpenCam(camState);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 ">LINK</div>
      <div className="flex w-1/2 flex-col ">
        <div className="flex flex-1 items-center justify-center">
          {isOpenCam && (
            <Webcam
            className="w-[100%]"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
          />
          )}
        </div>
        <div>
          <ControlMenu onOpenCam={onOpenCam} />
        </div>
      </div>
    </div>
  );
};

export default Waiting;
