import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:80", // 服务端请求baseURL设置为远程服务器即可
});

export default instance;
