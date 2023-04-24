import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "../Routes";
import { Provider } from "react-redux";
import getStore from "../store";

const App = () => {
  return (
    <Provider store={getStore()}>
      <BrowserRouter>{Routes()}</BrowserRouter>
    </Provider>
  );
};

hydrateRoot(document.getElementById("root"), <App />);
