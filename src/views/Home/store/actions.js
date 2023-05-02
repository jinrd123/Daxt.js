import { CHANGE_HOME_LIST } from "./constants";

export const changeHomeData = (data) => ({
  type: CHANGE_HOME_LIST,
  data,
});

export const getHomeData = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get("/").then((res) => {
      const homeData = res.data;
      dispatch(changeHomeData(homeData));
    });
  };
};
