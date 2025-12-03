import { lazy } from "react";

import { createBrowserRouter, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("pages/RegisterPage/RegisterPage"));

const AuthRoute = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <div>Trang không tồn tại (404)</div>,
  },
]);

export default AuthRoute;
