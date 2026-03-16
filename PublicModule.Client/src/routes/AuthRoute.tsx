import { lazy, Suspense } from "react";

import { createBrowserRouter } from "react-router-dom";
import { GuestLayout } from "layouts";

const HomePage = lazy(() => import("pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("pages/RegisterPage/RegisterPage"));
const LandingPage = lazy(() => import("pages/LandingPage/LandingPage"));

const AuthRoute = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <GuestLayout>
          <HomePage />
        </GuestLayout>
      </Suspense>
    ),
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
