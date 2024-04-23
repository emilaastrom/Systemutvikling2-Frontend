import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const host = "http://localhost";
const api = "/api/v1";

type Info = {
  port: number;
  path: string;
};

const authInfo: Info = {
  port: 8080,
  path: "/auth",
};

const goalInfo: Info = {
  port: 8081,
  path: "/goal",
};

const bankInfo: Info = {
  port: 8082,
  path: "/bank",
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
  return "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4NDcxMDFkYS0xMDBmLTQ2MTYtYTIxNy02MDM2YTZhZDIzMTIiLCJpYXQiOjE3MTM4NzYzMzUsImV4cCI6MTcxMzkxMjMzNX0.Q5f44k_KcgJgO3XvzVV3BFBSJHL-GKNP2031p2JUBs0";
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
const bankService = createAxiosService(bankInfo);
const authService = createAxiosService(authInfo);

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

function CreateConsent(): Promise<string> {
  return apiHandler(bankService, "post", "/createConsent");
}

function GetConsent(): string {
  return apiHandler(bankService, "get", "/getConsent");
}

function DeleteConsent(): string {
  return apiHandler(bankService, "delete", "/deleteConsent");
}

function GetConsentStatus(): string {
  return apiHandler(bankService, "post", "/getConsentStatus");
}

function GetAccountInfo(): string {
  return apiHandler(bankService, "get", "/getAccountInfo");
}

function GetBalance(): string {
  return apiHandler(bankService, "get", "/getBalance");
}

function GetTransactionList(): string {
  return apiHandler(bankService, "get", "/getTransactionList");
}

function CreateTransfer(): string {
  return apiHandler(bankService, "post", "/createTransfer");
}

function CreatePeriodicTransfer(): string {
  return apiHandler(bankService, "post", "/createPeriodicTransfer");
}

function Login(data: LoginRequest): Promise<AuthResponse> {
  return apiHandler(authService, "post", "/login", data);
}

function Register(data: RegisterRequest): MessageResponse {
  return apiHandler(authService, "post", "/register", data);
}

function Verify(): AuthResponse {
  return apiHandler(authService, "get", "/verify");
}

function ValidateToken(data: string): boolean {
  return apiHandler(authService, "post", "/validateToken", data);
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
  CreateConsent,
  GetConsent,
  DeleteConsent,
  GetConsentStatus,
  GetAccountInfo,
  GetBalance,
  GetTransactionList,
  CreateTransfer,
  CreatePeriodicTransfer,
  Login,
  Register,
  Verify,
  ValidateToken,
};
