import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const host = "http://localhost";
const api = "";
// const api = "/api/v1";

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
  return "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZGVmNTU1My02Mzg4LTQ1OTYtODViMS00Njg3MDdlZWYyYzUiLCJpYXQiOjE3MTM5NTA1NTEsImV4cCI6MTcxMzk4NjU1MX0.thmhOHq3QVeZjv8aAPixTyQC5H4VPV7gKpu6sjLipzc";
  // const { token } = useAuth();
  // return token;
}

const token = getAuthToken();
//TODO Remove any
const createAxiosService = (info: any, timeout = 1000) => {
  const service = axios.create({
    baseURL: `${host}:${info.port}${api}${info.path}`,
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
    (error: any) => Promise.reject(error)
  );

  return service;
};

function ApiHandler(service: any, method: any, url: String, data = null) {
  const config = data ? [service + url, data] : [service + url];
  return gatewayService[method](...config)
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        `Failed to ${method === "get" ? "fetch" : "post"}: ${url}`,
        error
      );
      throw error;
    });
}

const gatewayService = createAxiosService(serviceInfo.gateway);

export { ApiHandler };
