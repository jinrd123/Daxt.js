import express from "express";
import { render } from "./serverRender";
import { getStore } from "../store";
import { routesConfig } from "../Routes";
import { matchRoutes } from "react-router-dom";
import proxy from "express-http-proxy";
import CircuitBreaker from "./circuitBreaker";
import { renderDegraded } from "./degradation";
import { REMOTE_URL } from "../constants/proxyConfig";
import { SERVER_PORT } from "../constants/serverConfig";

const app = express();
app.use(express.static("clientOutput"));
app.use(express.static("public"));

// 创建熔断器实例
const ssrBreaker = new CircuitBreaker();


// 添加本地API接口
app.get("/features", (req, res) => {
  // 模拟从数据库或其他数据源获取数据
  const featuresData = {
    code: 200,
    message: "success",
    features: [
      {
        title: "样式直出",
        desc: "支持CSS的SSR，解决样式闪动问题"
      },
      {
        title: "异步数据SSR",
        desc: "可控的异步数据渲染，极致的首屏性能与SEO支持"
      },
      {
        title: "CSR熔断降级",
        desc: "支持自动/手动CSR渲染降级，避免服务端性能瓶颈"
      },
      {
        title: "开发体验与生态集成",
        desc: "热更新、反向代理、antd、配置化路由、状态管理..."
      },
    ]
  };
  
  res.json(featuresData);
});

app.use(
  "/api",
  proxy(REMOTE_URL, {
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

app.listen(SERVER_PORT, () => {
  console.log("server run successfully");
});
