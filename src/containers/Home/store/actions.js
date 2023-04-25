import axios from "axios";

export const getHomeList = () => {
  return () => {
    axios.get("http://127.0.0.1:80").then((res) => {
      console.log(res);
    });
  };
};
