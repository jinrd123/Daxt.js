import { CHANGE_HOME_LIST } from "./constants";
import clientAxios from "../../../client/request";
import serverAxios from "../../../server/request";

export const changeHomeData = (data) => ({
  type: CHANGE_HOME_LIST,
  data,
});

export const getHomeData = (server) => {
  const request = server ? serverAxios : clientAxios;
  return (dispatch) => {
    return request.get("/").then((res) => {
      const homeData = res.data;
      dispatch(changeHomeData(homeData));
    });
  };
};
