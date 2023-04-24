import express from "express";
import { render } from "./utils";
import store from "../store";

const app = express();
app.use(express.static("public"));

app.get("*", (req, res) => {
  console.log(store.getState().name);
  res.send(render(req));
});

app.listen(3000, () => {
  console.log("server run successfully");
});
