import React, { ComponentType, lazy } from "react";

import {
  ActionFunction,
  LoaderFunction,
  RouteObject,
  ShouldRevalidateFunction,
} from "react-router-dom";

import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "@/pages/Contact";
import ErrorPage from "@/pages/ErrorPage";
import Root, { loader as rootLoader, action as rootAction } from "@/pages/Root";
import EditContact, { action as editAction } from "@/pages/Edit";
import { action as destroyAction } from "@/pages/Destroy";

export type RoutesType = {
  caseSensitive?: boolean;
  path?: string;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  hasErrorBoundary?: boolean;
  shouldRevalidate?: ShouldRevalidateFunction;
  handle?: any;
  index?: true;
  children?: RoutesType[];
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;

  key?: string;
  name?: string;
  redirect?: string;
};

function lazyLoad(src: () => Promise<{ default: ComponentType<any> }>) {
  const Component = lazy(src);
  return <Component />;
}

const routes: RoutesType[] = [
  {
    path: "/",
    name: "首页",
    element: lazyLoad(() => import("@/pages/Layouts")),
    children: [
      {
        path: "home",
        name: "首页",
        element: lazyLoad(() => import("@/pages/Home")),
      },
      {
        path: "about",
        name: "关于",
        element: lazyLoad(() => import("@/pages/About")),
      },
      {
        path: "contacts",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <h1>xxx</h1>,
              },
              {
                path: "contacts/:contactId",
                element: <Contact />,
                loader: contactLoader,
                action: contactAction,
              },
              {
                path: "contacts/:contactId/edit",
                element: <EditContact />,
                loader: contactLoader,
                action: editAction,
              },
              {
                path: "contacts/:contactId/destroy",
                action: destroyAction,
                errorElement: <div>Oops! There was an error.</div>,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
