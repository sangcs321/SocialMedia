import react, { Suspense } from "react";

import "./App.css";
import { RouterProvider } from "react-router-dom";
import AuthRoute from "routes/AuthRoute";

export const App = () => {
  return (
    <Suspense fallback={<div>Đang tải trang...</div>}>
      <RouterProvider router={AuthRoute} />
    </Suspense>
  );
};
