"use client"

import { ControlMenu } from "@/components/moleculers";
import React, { useState } from "react";
import Webcam from "react-webcam";


const Waiting = () => {
  const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const [isOpenCam, setIsOpenCam] = useState(false);


const webcamRef = React.useRef(null);
const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);


let videoConstraints: MediaTrackConstraints = {
  facingMode: facingMode,
  width: 700,
  height: 700
};


  const onOpenCam = (camState:boolean) => {
    setIsOpenCam(camState)
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/2 bg-slate-500">LINK</div>
      <div className="w-1/2 bg-slate-600 flex flex-col">
          <div className="min-h-[91%] flex items-center justify-center">
          {isOpenCam && <Webcam
              className="webcam"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              screenshotQuality={1}
            />}
            {!isOpenCam && <div>AVATAR</div>}
          </div>
          <div>
            <ControlMenu onOpenCam={onOpenCam}/>
          </div>
      </div>
    </div>
  );
};

export default Waiting;
