import axios from "axios";
import { REMOTE_URL } from "../constants/proxyConfig";

const instance = axios.create({
  baseURL: REMOTE_URL, // 服务端请求baseURL设置为远程服务器即可
});

export default instance;
