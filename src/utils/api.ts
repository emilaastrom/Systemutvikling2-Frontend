import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const protocol = "https://";
const host = "ep.sysdevservices.tech/";

export const useApiService = () => {
  const { token } = useAuth();

  const service = axios.create({
    baseURL: `${host}:8080`,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 1000,
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

export const useApiHandler = () => {
  const gatewayService = useApiService();

  const apiHandler = async (service, method, url, data = null) => {
    const path = protocol + host + service + url;
    const config = data ? [path, data] : [path];

    try {
      const response = await gatewayService[method](...config);
      return response.data;
    } catch (error) {
      console.error(`Failed to ${method}: ${url}`, error);
      throw error;
    }
  };
  return apiHandler;
};
