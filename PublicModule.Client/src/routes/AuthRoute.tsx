import { lazy } from "react";

import { createBrowserRouter } from "react-router";

const LoginPage = lazy(() => import("pages/LoginPage/LoginPage"));
export const AuthRoute = createBrowserRouter([
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
]);
