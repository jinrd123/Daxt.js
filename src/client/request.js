import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // api触发本node服务的代理转发
});

export default instance;
