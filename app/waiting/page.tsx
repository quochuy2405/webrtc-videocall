"use client"

import { ControlMenu } from "@/components/moleculers";
import React, { useState } from "react";

const Waiting = () => {

  const onOpenCam = (camState:boolean) => {
    console.log('cam', camState)
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/2 bg-slate-500">LINK</div>
      <div className="w-1/2 bg-slate-600 flex flex-col">
          <div className="min-h-[91%] flex items-center justify-center">Avatar</div>
          <div>
            <ControlMenu onOpenCam={onOpenCam}/>
          </div>
      </div>
    </div>
  );
};

export default Waiting;
