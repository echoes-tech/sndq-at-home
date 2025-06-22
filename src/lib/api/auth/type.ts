import { User } from "@/lib/types/user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface Building {
  id: string;
  name: string;
  address: string;
  status: string;
  description: string;
}

export interface UserByCodeResponse {
  id: string;
  name: string;
  email: string;
  code: string;
  phone: string;
  avatar: string;
  is_council_member: boolean;
  activation_date: string | null;
  last_login: string | null;
  status: string;
  role: string;
  created_at: string;
  updated_at: string;
  has_password: boolean;
  buildings: Building[];
}

export interface PasswordStatusResponse {
  has_password: boolean;
  user_info: User;
}

export interface ChangePasswordRequest {
  code: string;
  password: string;
}

export interface ChangePasswordResponse {
  message: string;
}
