import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  useRoutes,
} from "react-router-dom";
import Home from "./pages/Home";
import Layouts from "./pages/Layouts";
import CreateRoutes from "./pages/Layouts/renderRoutes";
// import routes from "./routes";

// const router = createBrowserRouter(routes);

// const element = useRoutes(routes);

const App = () => {
  let routes = [
    {
      path: "/",
      element: <Layouts />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/courses",
          element: <Home />,
          children: [
            { index: true, element: <Home /> },
            { path: "/courses/:id", element: <Home /> },
          ],
        },
        { path: "*", element: <Home /> },
      ],
    },
  ];

  // The useRoutes() hook allows you to define your routes as JavaScript objects
  // instead of <Routes> and <Route> elements. This is really just a style
  // preference for those who prefer to not use JSX for their routes config.
  let element = useRoutes(routes);
  // return <RouterProvider router={router} />;

  return (
    <>
      {/* <CreateRoutes routes={routes} /> */}
      {element}
    </>
  );
};

export default App;
