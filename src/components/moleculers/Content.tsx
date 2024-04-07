import ContentHeader from "./ContentHeader";
import VideoContent from "./VideoContent";

import React from "react";

const Content = () => {
  return (
    <div className="m-5 w-full">
      <div className="w-full">
        <ContentHeader />
      </div>
      <div>
        <VideoContent />
      </div>
    </div>
  );
};

export default Content;
