import React from "react"; // 提供jsx语法支持
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { routesConfig, getRoutes } from "../Routes";
import { Provider } from "react-redux";
import StyleContext from "isomorphic-style-loader/StyleContext";

export const render = (req, store) => {
  const css = new Set(); // CSS for all rendered React components
  const insertCss = (...styles) =>
    styles.forEach((style) => css.add(style._getCss()));
  const content = renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        <div>123</div>
        <StaticRouter location={req.path} context={{}}>
          {getRoutes(routesConfig)}
        </StaticRouter>
      </Provider>
    </StyleContext.Provider>
  );
  return `
        <html>
            <head>
                <title>hello</title>
                <style>${[...css].join("")}</style>
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                  window.context = {
                    state: ${JSON.stringify(store.getState())}
                  }
                </script>
                <script src="./index.js"></script>
            </body>
        </html>
    `;
};
