import React from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import Home from "./containers/Home";
import About from "./containers/About";
import AboutChildren from "./containers/About/Children";

export const routesConfig = [
  {
    path: "/",
    element: <Home />,
    loadData: Home.loadData,
  },
  {
    path: "/about",
    element: <About />,
    children: [
      {
        path: "/about",
        element: <Navigate to="/about/children" />,
      },
      {
        path: "/about/children",
        element: <AboutChildren />,
      },
    ],
  },
];

export const getRoutes = (routesConfig) => {
  const getRouteStructure = (routesConfig) => {
    const RouteStructure = routesConfig.map((route, index) => {
      if (route.children && route.children.length > 0) {
        return (
          <Route {...route} key={index}>
            {getRouteStructure(route.children)}
          </Route>
        );
      } else {
        return <Route {...route} key={index} />;
      }
    });
    return RouteStructure;
  };

  return <RouterRoutes>{getRouteStructure(routesConfig)}</RouterRoutes>;
};
