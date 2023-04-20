import express from "express";
import React from "react"; // 提供jsx语法支持
import { renderToString } from "react-dom/server";
import Home from "./containers/Home";

const app = express();
app.use(express.static("public"));
const content = renderToString(<Home />);

app.get("/", (req, res) => {
  res.send(
    `<html>
        <head>
            <title>hello</title>
        </head>
        <body>
            <div id="root">${content}</div>
            <script src="./index.js"></script>
        </body>
    </html>`
  );
});

app.listen(3000, () => {
  console.log("server run successfully");
});
