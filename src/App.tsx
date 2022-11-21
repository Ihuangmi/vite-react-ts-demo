import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const GetRoutes = () => useRoutes(routes);

  return (
    <BrowserRouter basename="/">
      <GetRoutes />
    </BrowserRouter>
  );
}

export default App;
