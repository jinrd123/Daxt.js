import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { routesConfig, getRoutes } from "../Routes";
import { Provider } from "react-redux";
import { getClientStore } from "../store";
import StyleContext from "isomorphic-style-loader/StyleContext";

const App = () => {
  return (
    <Provider store={getClientStore()}>
      <BrowserRouter>{getRoutes(routesConfig)}</BrowserRouter>
    </Provider>
  );
};

const insertCss = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss());
  return () => removeCss.forEach((dispose) => dispose());
};

// 检测是否为降级模式
const isDegradedMode = () => {
  // 优先检查服务端标记
  if (window.__DEGRADED_MODE__) {
    return true;
  }
  
  const rootElement = document.getElementById("root");
  // 检查是否有服务端渲染的React内容
  const hasServerContent = rootElement.children.length > 0;
  const hasComplexContent = rootElement.innerHTML.includes('class=') || 
                           rootElement.innerHTML.includes('data-react');
  
  // 检查是否有服务端状态
  const hasServerState = window.context && window.context.state;
  
  // 如果只有简单的loading内容且没有服务端状态，则为降级模式
  return hasServerContent && !hasComplexContent && !hasServerState;
};

const rootElement = document.getElementById("root");

if (isDegradedMode()) {
  // 降级模式：清空root元素，使用createRoot进行完整渲染
  console.log("检测到降级模式，使用CSR渲染");
  // 清空ssr渲染的熔断相关tip/loading元素，同时清空root元素的内部dom以适配createRoot的入参要求
  rootElement.innerHTML = '';
  const root = createRoot(rootElement);
  root.render(
    <StyleContext.Provider value={{ insertCss }}>
      <App />
    </StyleContext.Provider>
  );
} else {
  // 正常模式：使用hydrateRoot进行水合
  console.log("正常模式，使用SSR水合");
  hydrateRoot(
    rootElement,
    <StyleContext.Provider value={{ insertCss }}>
      <App />
    </StyleContext.Provider>
  );
}
