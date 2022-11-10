import axios from "axios";
import Cookies from "./cookie";

const AxiosClient = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
AxiosClient.interceptors.request.use(
  async function (config) {
    if (Cookies.get("refreshToken")) {
      const refreshToken = JSON.parse(Cookies.get("refreshToken"));
      const nre = await axios.post(`http://localhost:3001/auth/refresh-token`, {
        refreshToken,
      });
      config.headers.Authorization = nre.data.token;
    }
    return config;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default AxiosClient;
