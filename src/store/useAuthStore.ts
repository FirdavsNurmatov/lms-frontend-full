import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DataT, UserT } from "../config";

export const useAuthStore = create<DataT>()(
  persist(
    (set) => ({
      user: {},
      token: null,
      setUser: (user: UserT) => set({ user: user }),
      setToken: (token: string) => set({ token }),
    }),
    {
      name: "auth",
    }
  )
);
