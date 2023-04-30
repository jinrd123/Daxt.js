import express from "express";
import { render } from "./utils";
import { getStore } from "../store";
import { routesConfig } from "../Routes";
import { matchRoutes } from "react-router-dom";
import proxy from "express-http-proxy";

const app = express();
app.use(express.static("public"));

app.use(
  "/api",
  proxy("http://127.0.0.1", {
    proxyReqPathResolver: function (req) {
      return req.url;
    },
  })
);

app.get("*", (req, res) => {
  const store = getStore();
  // const matchedRoutes = matchRoutes(routesConfig, req.path);
  // const promises = [];
  // matchedRoutes.forEach((item) => {
  //   if (item.route.loadData) {
  //     promises.push(item.route.loadData(store));
  //   }
  // });
  // Promise.all(promises).then(() => {
  res.send(render(req, store));
  // });
});

app.listen(3000, () => {
  console.log("server run successfully");
});
