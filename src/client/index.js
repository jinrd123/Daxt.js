import React from "react";
import { hydrateRoot } from "react-dom/client";
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

hydrateRoot(
  document.getElementById("root"),
  <StyleContext.Provider value={{ insertCss }}>
    <App />
  </StyleContext.Provider>
);
