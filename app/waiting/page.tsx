"use client";

import { ControlMenu } from "@/components/moleculers";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";


const Waiting = () => {
  const refVideo = useRef<HTMLVideoElement | null>(null);

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
    console.log("cam", camState);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-slate-500">LINK</div>
      <div className="flex w-1/2 flex-col bg-slate-600">
        <div className="flex flex-1 items-center justify-center">
          <video
            ref={refVideo}
            autoPlay
            playsInline
            muted
            className="h-full w-full bg-black"
          ></video>
        </div>
        <div>
          <ControlMenu onOpenCam={onOpenCam} />
        </div>
      </div>
    </div>
  );
};

export default Waiting;
