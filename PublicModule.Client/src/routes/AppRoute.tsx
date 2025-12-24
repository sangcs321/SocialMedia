import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("pages/HomePage/HomePage"));

const AppRoute: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Đang tải trang...</div>}>
        <HomePage />
      </Suspense>
    ),
  },
];

export default AppRoute;
