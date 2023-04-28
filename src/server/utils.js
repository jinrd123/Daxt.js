import React from "react"; // 提供jsx语法支持
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { routesConfig, getRoutes, fetchAsyncData } from "../Routes";
import { Provider } from "react-redux";
import getStore from "../store";

export const render = (req) => {
  const store = getStore();
  fetchAsyncData(routesConfig, req.path, store);
  const content = renderToString(
    <Provider store={store}>
      {/* <StaticRouter />就是通过req.path确定要对哪个路由组件进行ssr渲染，这里我们也要通过req.path对要ssr的组件进行异步数据获取 */}
      <StaticRouter location={req.path}>{getRoutes(routesConfig)}</StaticRouter>
    </Provider>
  );
  return `
        <html>
            <head>
                <title>hello</title>
            </head>
            <body>
                <div id="root">${content}</div>
                <script src="./index.js"></script>
            </body>
        </html>
    `;
};
