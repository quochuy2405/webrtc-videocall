import React, { ReactNode } from "react";
interface DefaultLayoutProps {
  children: ReactNode;
}
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return <div className="bg-white p-8">{children}</div>;
};

export default DefaultLayout;
