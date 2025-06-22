import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserByCodeResponse } from "@/lib/api/auth/type";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserByCodeResponse | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: UserByCodeResponse | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setUser: (user) => set({ user }),
      logout: () =>
        set({ isAuthenticated: false, isLoading: false, user: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
