import React from "react";
import {MenuBar,Content} from "@/components/moleculers"

const Home = () => {
  return (
    <div className="flex h-screen gap-3">
      <MenuBar />
      {/* <Content className="bg-white-100 grow" /> */}
      <Content/>
    </div>
  );
};

export default Home;
