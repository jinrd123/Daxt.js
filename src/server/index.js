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
  try {
    const store = getStore();
    const matchedRoutes = matchRoutes(routesConfig, req.path);
    
    // 检查是否匹配到路由
    if (!matchedRoutes || matchedRoutes.length === 0) {
      res.status(404).send(render(req, store));
      return;
    }
    
    const promises = [];
    matchedRoutes.forEach((item) => {
      if (item.route.loadData) {
        const promise = item.route.loadData(store).catch((error) => {
          console.error(`Error loading data for route ${item.route.path}:`, error);
          // 返回空数据，避免整个请求失败
          return null;
        });
        promises.push(promise);
      }
    });
    
    Promise.all(promises).then(() => {
      res.send(render(req, store));
    })
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("server run successfully");
});
