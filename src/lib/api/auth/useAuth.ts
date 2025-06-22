import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  PasswordStatusResponse,
  UserByCodeResponse,
} from "./type";

const login = async (data: LoginRequest) => {
  const response = await apiClient.post<LoginResponse>("/auth/login", data);
  return response.data;
};

const checkUserByCode = async (code: string) => {
  const response = await apiClient.post<UserByCodeResponse>(
    `/auth/check-user-by-code`,
    {
      code,
    }
  );
  return response.data;
};

const checkPasswordStatus = async (code: string) => {
  const response = await apiClient.get<PasswordStatusResponse>(
    `/auth/check-password-status/${code}`
  );
  return response.data;
};

const changePassword = async (data: ChangePasswordRequest) => {
  const response = await apiClient.post<LoginResponse>(
    `/auth/set-password`,
    data
  );
  return response.data;
};

const getProfile = async () => {
  const response = await apiClient.get<UserByCodeResponse>("/auth/profile");
  return response.data;
};

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}

export function useCheckUserByCode() {
  return useMutation({
    mutationFn: checkUserByCode,
  });
}

export function useCheckPasswordStatus() {
  return useMutation({
    mutationFn: checkPasswordStatus,
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}

export function useProfile(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
    enabled: options?.enabled ?? true,
  });
}
