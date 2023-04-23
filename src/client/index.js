import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "../Routes";

const App = () => {
  return <BrowserRouter>{Routes()}</BrowserRouter>;
};

hydrateRoot(document.getElementById("root"), <App />);
