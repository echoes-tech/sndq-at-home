import { create } from "zustand";
import { UserByCodeResponse } from "@/lib/api/auth/type";

interface UserState {
  user: UserByCodeResponse | null;
  setUser: (user: UserByCodeResponse | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
