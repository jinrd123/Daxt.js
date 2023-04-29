import React from "react"; // 提供jsx语法支持
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { routesConfig, getRoutes } from "../Routes";
import { Provider } from "react-redux";

export const render = (req, store) => {
  const content = renderToString(
    <Provider store={store}>
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
