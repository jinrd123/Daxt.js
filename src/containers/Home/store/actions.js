import { CHANGE_HOME_LIST } from "./constants";
import axios from "axios";

export const changeHomeData = (data) => ({
  type: CHANGE_HOME_LIST,
  data,
});

export const getHomeData = () => {
  return (dispatch) => {
    return axios.get("http://127.0.0.1:80").then((res) => {
      const homeData = res.data;
      dispatch(changeHomeData(homeData));
    });
  };
};
