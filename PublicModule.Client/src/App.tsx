import react from "react";

import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AuthRoute } from "routes";

export const App = () => {
  return <RouterProvider router={AuthRoute} />;
};
