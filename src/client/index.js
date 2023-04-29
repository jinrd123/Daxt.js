import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { routesConfig, getRoutes } from "../Routes";
import { Provider } from "react-redux";
import { getClientStore } from "../store";

const App = () => {
  return (
    <Provider store={getClientStore()}>
      <BrowserRouter>{getRoutes(routesConfig)}</BrowserRouter>
    </Provider>
  );
};

hydrateRoot(document.getElementById("root"), <App />);
