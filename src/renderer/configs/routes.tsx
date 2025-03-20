import React from "react";
import { RouteObject, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Prompts from "../pages/Settings/prompts";
import Fields from "../pages/Settings/fields";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/settings",
    children: [
      {
        path: "prompts",
        element: <Prompts />,
      },
      {
        path: "fields",
        element: <Fields />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />, // Redirect to Home for unmatched routes
  },
];

export default routes;
