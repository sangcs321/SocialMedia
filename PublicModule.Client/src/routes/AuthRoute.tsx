import { lazy, Suspense } from "react";

import { createBrowserRouter } from "react-router-dom";
import { GuestLayout } from "layouts";
import AppRoute from "./AppRoute";

const LoginPage = lazy(() => import("pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("pages/RegisterPage/RegisterPage"));
const LandingPage = lazy(() => import("pages/LandingPage/LandingPage"));

const AuthRoute = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [...AppRoute],
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
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

export default AuthRoute;
