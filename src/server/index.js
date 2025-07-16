import express from "express";
import { render } from "./utils";
import { getStore } from "../store";
import { routesConfig } from "../Routes";
import { matchRoutes } from "react-router-dom";
import proxy from "express-http-proxy";
import CircuitBreaker from "./circuitBreaker";
import { renderDegraded } from "./degradation";

const app = express();
app.use(express.static("public"));

// 创建熔断器实例
const ssrBreaker = new CircuitBreaker();

app.use(
  "/api",
  proxy("http://127.0.0.1", {
    proxyReqPathResolver: function (req) {
      return req.url;
    },
  })
);

app.get("*", (req, res) => {
  // 检查熔断器状态
  if (ssrBreaker.isOpen()) {
    console.log("熔断器开启，使用CSR降级渲染");
    res.send(renderDegraded());
    console.log('@csrFallback render success');
    return;
  }

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
          return null;
        });
        promises.push(promise);
      }
    });
    
    Promise.all(promises).then(() => {
      ssrBreaker.onSuccess(); // SSR成功
      res.send(render(req, store));
    }).catch((error) => {
      console.error("SSR rendering failed:", error);
      ssrBreaker.onFailure(); // SSR失败，触发熔断
      res.send(renderDegraded());
    });
  } catch (error) {
    console.error("Server error:", error);
    ssrBreaker.onFailure(); // 服务器错误，触发熔断
    res.send(renderDegraded());
  }
});

app.listen(3000, () => {
  console.log("server run successfully");
});
