import axios, {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosError,
} from "axios";
import { ACCESS_TOKEN_KEY } from "../constants/system";
import { toast } from "sonner";

interface ApiConfig {
  baseURL: string;
  maxRetryAttempts: number;
  retryDelay: number;
}

const apiConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  maxRetryAttempts: 3,
  retryDelay: 1000,
};

const api = axios.create({
  baseURL: apiConfig.baseURL,
  withCredentials: true,
});

// Add access token to header request
const addAuthHeader = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(addAuthHeader);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!error.response) {
      toast.error("No response from server");
      return Promise.reject(error);
    }
    const { response } = error;
    const { status } = response;
    if (status === 401) {
      toast.error("Session expired");
    }
    if (status === 403) {
      toast.error("Forbidden");
    }
    if (status === 404) {
      toast.error("Not found");
    }
    if (status === 500) {
      toast.error("Internal server error");
    }
    return Promise.reject(error);
  }
);

const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) => api.get<T>(url, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    api.post<T>(url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    api.put<T>(url, data, config),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    api.patch<T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config),
};

export { apiClient };
