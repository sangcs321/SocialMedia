import { useState } from "react";

import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AuthRoute } from "routes";
import LoginPage from "pages/LoginPage/LoginPage";

export const App = () => {
  return <RouterProvider router={AuthRoute} />;
};
