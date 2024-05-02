import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { useAuth } from "@/context/AuthContext";
import { useMemo } from "react";
const protocol: string = "";
const host: string = process.env.NEXT_PUBLIC_BASE_URL;

export const useApiService = (): AxiosInstance => {
  const { token } = useAuth();

  const service: AxiosInstance = axios.create({
    baseURL: `${protocol}${host}:8080`,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 5000,
  });

  service.interceptors.request.use(
    async (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  return service;
};

export const useApiHandler = () => {
  const gatewayService = useApiService();

  const apiHandler = useMemo(() => {
    return async (
      serviceName: string,
      method: "get" | "post" | "put" | "patch" | "delete",
      url: string,
      data: any = null
    ): Promise<{ data: any; statusText: string; status: number }> => {
      const path: string = `${protocol}${host}${serviceName}${url}/`;

      try {
        switch (method) {
          case "get":
          case "delete": {
            // Direct method call with the path only
            const res = await gatewayService[method](path);
            return {
              data: res.data,
              statusText: res.statusText,
              status: res.status,
            };
          }

          case "post":
          case "put":
          case "patch": {
            // Method calls with path and data
            const res = await gatewayService[method](path, data);
            return {
              data: res.data,
              statusText: res.statusText,
              status: res.status,
            };
          }
        }
      } catch (error) {
        console.error(`Failed to ${method}: ${url}`, error);
        throw error;
      }
    };
  }, [gatewayService]);
  return apiHandler;
};
