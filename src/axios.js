import axios from "axios";
import Cookies from "js-cookie";

import { API_URL } from "./statics/constants";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

instance.interceptors.request.use(
  async (config) => {
    // console.log(instance.interceptors.request);
    const token = Cookies.get("admin_access_token");
    if (token) {
      // console.log(token);
      // console.log(config);
      config.headers["access_token"] = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
