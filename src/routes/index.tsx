import React from "react";
import type { ComponentType } from "react";
import { lazy } from "react";
import { Navigate } from "react-router";
import { MenuDataItem } from "@/type";

function lazyLoad(src: () => Promise<{ default: ComponentType<any> }>) {
  return lazy(src);
}

const Home = lazyLoad(() => import("@/pages/Home"));
const About = lazyLoad(() => import("@/pages/About"));

const routes: MenuDataItem[] = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    auth: true,
    element: <Home />,
  },
  {
    path: "/about",
    auth: true,
    element: <About />,
  },
];

export default routes;
