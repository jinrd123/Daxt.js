import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "../Routes";
import { createStore } from "redux";
import { Provider } from "react-redux";

const reducer = (state = { name: "daxt" }, action) => {
  return state;
};

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>{Routes()}</BrowserRouter>
    </Provider>
  );
};

hydrateRoot(document.getElementById("root"), <App />);
