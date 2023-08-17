import axios from "axios";
import Cookies from "js-cookie";

import { API_BASE_URL } from "./variables";

export const getRequest = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });

  const token = Cookies.get("token");
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "token"
    )}`;
  }

  return instance;
};

const instance = axios.create({
  baseURL: API_BASE_URL,
});

if (Cookies.get("token")) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
    "token"
  )}`;
}

export default instance;
