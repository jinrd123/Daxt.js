import React from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";
import AboutChildren from "./views/About/Children";
import NotFound from "./views/NotFound";

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
  // 添加通配符路由，处理所有未匹配的路径
  {
    path: "*",
    element: <NotFound />,
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
