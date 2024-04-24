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
    (error) => Promise.reject(error)
  );

  return service;
};

function apiHandler(service, method, url, data = null) {
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

function GetActiveGoal(): Promise<Goal> {
  return apiHandler(serviceInfo.goal.path, "get", "/getActiveGoal");
}

function SetGoal(data: SetGoalRequest): Promise<SetGoalResponse> {
  return apiHandler(serviceInfo.goal.path, "post", "/setGoal", data);
}

function IncreaseProgress(
  data: IncreaseProgressRequest
): Promise<IncreaseProgressResponse> {
  return apiHandler(serviceInfo.goal.path, "post", "/increaseProgress", data);
}

function GetAllGoals(): Promise<Goal[]> {
  return apiHandler(serviceInfo.goal.path, "get", "/getAllGoals");
}

function GetUser(): Promise<User> {
  return apiHandler(serviceInfo.user.path, "get", "/getUser");
}

function UpdateUser(data: User): Promise<User> {
  return apiHandler(serviceInfo.user.path, "put", "/updateUser", data);
}

function GetAllByTimeLimitAsc(): Promise<Challenge> {
  return apiHandler(serviceInfo.challenge.path, "get", "/getAllByTimeLimitAsc");
}

function GetAllByTimeLimitDsc(): Promise<Challenge> {
  return apiHandler(serviceInfo.challenge.path, "get", "/getAllByTimeLimitDsc");
}

function UpdateChallenge(data: Challenge) {
  return apiHandler(serviceInfo.challenge.path, "patch", "/updateChallenge");
}

function GenerateNewChallenges() {
  return apiHandler(
    serviceInfo.challenge.path,
    "post",
    "/generateNewChallenges"
  );
}

function CreateConsent(): Promise<string> {
  return apiHandler(serviceInfo.bank.path, "post", "/createConsent");
}

function GetConsent(): string {
  return apiHandler(serviceInfo.bank.path, "get", "/getConsent");
}

function DeleteConsent(): string {
  return apiHandler(serviceInfo.bank.path, "delete", "/deleteConsent");
}

function GetConsentStatus(): string {
  return apiHandler(serviceInfo.bank.path, "post", "/getConsentStatus");
}

function GetAccountInfo(): string {
  return apiHandler(serviceInfo.bank.path, "get", "/getAccountInfo");
}

function GetBalance(): string {
  return apiHandler(serviceInfo.bank.path, "get", "/getBalance");
}

function GetTransactionList(): string {
  return apiHandler(serviceInfo.bank.path, "get", "/getTransactionList");
}

function CreateTransfer(): string {
  return apiHandler(serviceInfo.bank.path, "post", "/createTransfer");
}

function CreatePeriodicTransfer(): string {
  return apiHandler(serviceInfo.bank.path, "post", "/createPeriodicTransfer");
}

function Login(data: LoginRequest): Promise<AuthResponse> {
  return apiHandler(serviceInfo.auth.path, "post", "/login", data);
}

function Register(data: RegisterRequest): MessageResponse {
  return apiHandler(serviceInfo.auth.path, "post", "/register", data);
}

function Verify(): AuthResponse {
  return apiHandler(serviceInfo.auth.path, "get", "/verify");
}

function ValidateToken(data: string): boolean {
  return apiHandler(serviceInfo.auth.path, "post", "/validateToken", data);
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
