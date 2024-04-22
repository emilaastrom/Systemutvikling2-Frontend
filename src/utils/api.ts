import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const host = "http://localhost";
const goalport = "8081";
const goalapi = "/api/v1/goal";
// const {token } = useAuth();
const getAuthToken = () => {
  return "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4NDcxMDFkYS0xMDBmLTQ2MTYtYTIxNy02MDM2YTZhZDIzMTIiLCJpYXQiOjE3MTM3OTAyMzQsImV4cCI6MTcxMzgyNjIzNH0.VfG4f_FxKJ3IgSycnY25EojPdHLnPCuLYUS4P7e5M5o";
};

const goalService = axios.create({
  baseURL: `${host}:${goalport}${goalapi}`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});

goalService.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

function getActiveGoal() {
  return goalService
    .get("/getActiveGoal")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to get active goal: ", error);
      throw error;
    });
}

function setGoal(data) {
  return goalService
    .post("/setGoal", data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Failed to set goal: ", error);
      throw error;
    });
}

function increaseProgress(data) {
  return goalService
    .post("/increaseProgress", data)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Failed to increase progress: ", error);
      throw error;
    });
}

function getAllGoals() {
  return goalService
    .get("/getAllGoals")
    .then((response) => response.data)
    .catch((error) => {
      console.log("Failed to get goals", error);
      throw error;
    });
}

export { getActiveGoal, setGoal, increaseProgress, getAllGoals };
