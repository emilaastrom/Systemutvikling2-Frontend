import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { useAuth } from "@/context/AuthContext";

const protocol: string = "https://";
const host: string = "ep.sysdevservices.tech/";

export const useApiService = (): AxiosInstance => {
  const { token } = useAuth();

  const service: AxiosInstance = axios.create({
    baseURL: `${protocol}${host}:8080`,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 1000,
  });

service.interceptors.request.use(
    (config: any): any => { // Using 'any' to avoid strict type errors
      // Ensure headers are properly initialized to an object if undefined
      config.headers = config.headers || {};
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  return service;
};

export const useApiHandler = () => {
  const gatewayService = useApiService();

  const apiHandler = async (
    serviceName: string,
    method: "get" | "post" | "put" | "patch" | "delete",
    url: string,
    data: any = null,
  ): Promise<any> => {
    const path: string = `${protocol}${host}${serviceName}${url}`;

    try {
      switch (method) {
        case 'get':
        case 'delete':
          // Direct method call with the path only
          return (await gatewayService[method](path)).data;

        case 'post':
        case 'put':
        case 'patch':
          // Method calls with path and data
          return (await gatewayService[method](path, data)).data;
      }
    } catch (error) {
      console.error(`Failed to ${method}: ${url}`, error);
      throw error;
    }
  };

  return apiHandler;
};
