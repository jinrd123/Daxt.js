import React from "react";
import { hydrateRoot } from "react-dom/client";

import Home from "../containers/Home";

hydrateRoot(document.getElementById("root"), <Home />);
