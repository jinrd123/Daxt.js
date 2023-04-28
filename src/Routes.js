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

// TODO: 修改逻辑适配嵌套路由异步数据的获取，将下面的matchedRoute修改为mathedRoutes(当前只获取匹配到的一个顶层路由)
// 获取路由组件所需的异步数据填充到store中
// 这里要求组件挂载的loadData函数需要传入store实例
export const fetchAsyncData = (routesConfig, targetPath, store) => {
  const matchedRoute = matchRoutes(routesConfig, targetPath);
  if (matchedRoute && matchedRoute.loadData) {
    matchedRoute.loadData(store);
  }
};

// TODO: 增加嵌套路由的匹配支持 & 完善重定向处理...
// 获取客户端请求路径对应的所有需要获取异步数据的路由配置项
export const matchRoutes = (routesConfig, targetPath) => {
  let ans;
  routesConfig.map((route) => {
    if (route.path === targetPath) {
      ans = route;
    }
  });
  return ans;
};
