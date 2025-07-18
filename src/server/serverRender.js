import React from "react"; // 提供jsx语法支持
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { routesConfig, getRoutes } from "../Routes";
import { Provider } from "react-redux";
import StyleContext from "isomorphic-style-loader/StyleContext";
import { Helmet } from "react-helmet";
import { AntdConfigProvider } from "../utils/antdConfig";
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

export const render = (req, store) => {
  const css = new Set(); // CSS for all rendered React components
  const insertCss = (...styles) =>
    styles.forEach((style) => css.add(style._getCss()));
  
  // 创建Antd的CSS缓存
  const cache = createCache();
  
  const content = renderToString(
    <StyleProvider cache={cache}>
      <StyleContext.Provider value={{ insertCss }}>
        <Provider store={store}>
          <AntdConfigProvider>
            <StaticRouter location={req.path} context={{}}>
              {getRoutes(routesConfig)}
            </StaticRouter>
          </AntdConfigProvider>
        </Provider>
      </StyleContext.Provider>
    </StyleProvider>
  );

  // 提取Antd的CSS
  const antdStyles = extractStyle(cache, true);
  
  const helmet = Helmet.renderStatic();
  return `
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <style data-type="isomorphic-style-loader">${[...css].join("")}</style>
                <style data-type="antd-cssinjs">${antdStyles}</style>
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
