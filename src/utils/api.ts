import axios from "axios";
import { useAuth } from "@/context/AuthContext";

// const host = "http://localhost";
const https = "https://";
const host = ".sysdevservices.tech/";

function getAuthToken() {
  return "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYjE2MzRmNC1lMzRhLTQ0NTMtYjgzNS04NTdlZTE4ZDViNmEiLCJpYXQiOjE3MTQwMzA0NDMsImV4cCI6MTcxNDA2NjQ0M30.HTDyw32mCeWjOz-tt93asrfvD03ouETOxg_6ZOKXH9I";
}

export const useApiService = () => {
  const  token  = useAuth();

  const service = axios.create({
    baseURL: `${host}:8080`,
    headers: {
      "Content-Type": "application/json",
      // ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
    const path = https + service + host + service + url;
    const config = data
      ? [path, data]
      : [path];

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
