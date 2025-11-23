import { useState } from "react";

import "./App.scss";
import { RouterProvider } from "react-router";
import { AuthRoute } from "routes";

export const App = () => {
  return <RouterProvider router={AuthRoute} />;
};
