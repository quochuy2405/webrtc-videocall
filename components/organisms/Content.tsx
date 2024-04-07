import ContentHeader from "../moleculers/ContentHeader";
import VideoContent from "../moleculers/VideoContent";

import React from "react";

const Content = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2 ">
      <ContentHeader />
      <VideoContent />
    </div>
  );
};

export default Content;
