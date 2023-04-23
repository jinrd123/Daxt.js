import React from "react"; // 提供jsx语法支持
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import Routes from "../Routes";

export const render = (req) => {
  const content = renderToString(
    <StaticRouter location={req.path}>{Routes()}</StaticRouter>
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
