import { lazy } from "react";

import { createBrowserRouter, Navigate } from "react-router-dom";

const LoginPage = lazy(() => import("pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("pages/RegisterPage/RegisterPage"));
export const AuthRoute = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    // loader: () => {
    //   return {
    //     user: {
    //       id: 1,
    //       name: "John Doe",
    //     },
    //   };
    // },
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
