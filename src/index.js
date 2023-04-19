import express from "express";
import React from "react"; // 提供jsx语法支持
import { renderToString } from "react-dom/server";
import Home from "./containers/Home";

const app = express();
const content = renderToString(<Home />);

app.get("/", (req, res) => {
  res.send(
    `<html>
        <head>
            <title>hello</title>
        </head>
        <body>
            ${content}
        </body>
    </html>`
  );
});

app.listen(3000, () => {
  console.log("server run successfully");
});
