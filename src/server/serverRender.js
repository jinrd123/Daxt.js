import React from "react"; // 提供jsx语法支持
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { routesConfig, getRoutes } from "../Routes";
import { Provider } from "react-redux";
import StyleContext from "isomorphic-style-loader/StyleContext";
import { Helmet } from "react-helmet";

export const render = (req, store) => {
  const css = new Set(); // CSS for all rendered React components
  const insertCss = (...styles) =>
    styles.forEach((style) => css.add(style._getCss()));
  const content = renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        <StaticRouter location={req.path} context={{}}>
          {getRoutes(routesConfig)}
        </StaticRouter>
      </Provider>
    </StyleContext.Provider>
  );

  const helmet = Helmet.renderStatic();
  return `
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <style>${[...css].join("")}</style>
                <style>
                  * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                  }

                  html, body {
                    height: 100%;
                  }

                  #root {
                    min-height: 100vh;
                  }
                </style>
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                  window.__CONTEXT__ = {
                    initialState: ${JSON.stringify(store.getState())}
                  }
                </script>
                <script src="./index.js"></script>
            </body>
        </html>
    `;
};
