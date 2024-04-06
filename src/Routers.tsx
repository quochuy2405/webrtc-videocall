import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "./pages";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
]);

const Routers = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default Routers;
