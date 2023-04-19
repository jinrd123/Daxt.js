import express from "express";
import Home from "./containers/Home";

const app = express();

app.get("/", (req, res) => {
  res.send(
    `<html>
        <head>
            <title>hello</title>
        </head>
        <body>
            <h1>hello Daxt</h1>
            <p>start at 2023.4.18</p>
        </body>
    </html>`
  );
});

app.listen(3000, () => {
  console.log("server run successfully");
});
