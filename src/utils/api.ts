import axios from "axios";
import { useAuth } from "@/context/AuthContext";

// const host = "http://localhost";
const https = "https://"
const host = ".sysdevservices.tech/";

const serviceInfo = {
  auth: { port: 8111, path: "/auth" },
  goal: { port: 8081, path: "/goal" },
  bank: { port: 8082, path: "/bank" },
  user: { port: 8083, path: "/user" },
  challenge: { port: 8084, path: "/challenge" },
  gateway: { port: 8080, path: "" },
};
type Info = {
  port: number;
  path: string;
};

function getAuthToken() {
  return "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYjE2MzRmNC1lMzRhLTQ0NTMtYjgzNS04NTdlZTE4ZDViNmEiLCJpYXQiOjE3MTQwMzA0NDMsImV4cCI6MTcxNDA2NjQ0M30.HTDyw32mCeWjOz-tt93asrfvD03ouETOxg_6ZOKXH9I";
  // const { token } = useAuth();
  // return token;
}

const token = getAuthToken();

const createAxiosService = (info, timeout = 1000) => {
  const service = axios.create({
    baseURL: `${host}:${info.port}${info.path}`,
    headers: {
      "Content-Type": "application/json",
    },
    timeout,
  });

  service.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  return service;
};

function ApiHandler(service, method, url, data = null) {
  const config = data ? [https + service + host + service + url, data] : [https + service + host + service + url];
  return gatewayService[method](...config)
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        `Failed to ${method === "get" ? "fetch" : "post"}: ${url}`,
        error,
      );
      throw error;
    });
}

const gatewayService = createAxiosService(serviceInfo.gateway);

export { ApiHandler };
