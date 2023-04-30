import { CHANGE_HOME_LIST } from "./constants";
import axios from "axios";

export const changeHomeData = (data) => ({
  type: CHANGE_HOME_LIST,
  data,
});

export const getHomeData = () => {
  return (dispatch) => {
    return axios.get("/api").then((res) => {
      const homeData = res.data;
      dispatch(changeHomeData(homeData));
    });
  };
};
