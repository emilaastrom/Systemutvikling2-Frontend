import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const host = "http://localhost";
const api = "/api/v1";

type Info = {
  port: number;
  path: string;
};

const goalInfo: Info = {
  port: 8081,
  path: "/goal",
};

const userInfo: Info = {
  port: 8083,
  path: "/user",
};

const challengeInfo: Info = {
  port: 8084,
  path: "/challenge",
};

function getAuthToken() {
  return "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjNTYyZDRhMC05NGYwLTQ1MzItYmY1NC00NTI2OTVmYjRlY2EiLCJpYXQiOjE3MTM4NTM3MTIsImV4cCI6MTcxMzg4OTcxMn0.PGKexR6YN7o9pFqQiyvXjEElFNOwNzw4nJPU6FVhxyg";
  // const { token } = useAuth();
  // return token;
}

const token = getAuthToken();

const createAxiosService = (info, timeout = 1000) => {
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
    (error) => Promise.reject(error),
  );

  return service;
};

function apiHandler(service, method, url, data = null) {
  const config = data ? [url, data] : [url];
  return service[method](...config)
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        `Failed to ${method === "get" ? "fetch" : "post"}: ${url}`,
        error,
      );
      throw error;
    });
}

const goalService = createAxiosService(goalInfo);
const userService = createAxiosService(userInfo);
const challengeService = createAxiosService(challengeInfo);

function GetActiveGoal(): Promise<Goal> {
  return apiHandler(goalService, "get", "/getActiveGoal");
}

function SetGoal(data: SetGoalRequest): Promise<SetGoalResponse> {
  return apiHandler(goalService, "post", "/setGoal", data);
}

function IncreaseProgress(
  data: IncreaseProgressRequest,
): Promise<IncreaseProgressResponse> {
  return apiHandler(goalService, "post", "/increaseProgress", data);
}

function GetAllGoals(): Promise<Goal[]> {
  return apiHandler(goalService, "get", "/getAllGoals");
}

function GetUser(): Promise<User> {
  return apiHandler(userService, "get", "/getUser");
}

function UpdateUser(data: User): Promise<User> {
  return apiHandler(userService, "put", "/updateUser", data);
}

function GetAllByTimeLimitAsc(): Promise<Challenge> {
  return apiHandler(challengeService, "get", "/getAllByTimeLimitAsc");
}

function GetAllByTimeLimitDsc(): Promise<Challenge> {
  return apiHandler(challengeService, "get", "/getAllByTimeLimitDsc");
}

function UpdateChallenge(data: Challenge) {
  return apiHandler(challengeService, "patch", "/updateChallenge");
}

function GenerateNewChallenges() {
  return apiHandler(challengeService, "post", "/generateNewChallenges");
}

export {
  GetActiveGoal,
  SetGoal,
  IncreaseProgress,
  GetAllGoals,
  GetUser,
  UpdateUser,
  GetAllByTimeLimitDsc,
  GetAllByTimeLimitAsc,
  UpdateChallenge,
  GenerateNewChallenges,
};
