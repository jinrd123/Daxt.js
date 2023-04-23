import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import Home from "./containers/Home";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
    </RouterRoutes>
  );
};

export default Routes;
