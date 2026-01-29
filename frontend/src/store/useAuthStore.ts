import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "@/types/auth";
import { useNoteStore } from "./useNotesStore";
import {
  apiLogout,
  apiCheckAuth,
  apiDemoLogin,
  apiLogin,
  apiSignup,
} from "../lib/api/authService";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      isAuthorized: false,
      isInitialized: false, // Flag to track if initial auth check completed

      setUser: (user) => set({ user }),

      isDemoUser: () => get().user?.role === "demo-user",

      getDisplayName: () => {
        const user = get().user;
        if (!user) return "Guest";
        return user.role === "demo-user" ? "Guest" : user.name;
      },

      signup: async (
        name: string,
        email: string,
        photo: string,
        password: string | undefined,
        confirmPassword: string
      ) => {
        try {
          set({ loading: true });

          if (!password) {
            throw new Error("Password is required");
          }

          const user = await apiSignup(
            name,
            email,
            photo,
            password,
            confirmPassword
          );

          set({ user, isAuthorized: true, loading: false, isInitialized: true });
          return { success: true, user };
        } catch (err) {
          console.error("Signup error:", err);
          set({ loading: false, isAuthorized: false });
          return { success: false, error: (err as Error).message };
        }
      },

      login: async (email, password) => {
        try {
          set({ loading: true });
          const user = await apiLogin(email, password);
          set({ user, isAuthorized: true, loading: false, isInitialized: true });
          return { success: true, user };
        } catch (error) {
          console.error("Login error:", error);
          set({ loading: false, isAuthorized: false, user: null, isInitialized: true });
          return { success: false, error: (error as Error).message };
        }
      },

      logout: async () => {
        try {
          await apiLogout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          useNoteStore.getState().clearNotes();
          set({ user: null, isAuthorized: false, isInitialized: true });
        }
      },

      checkAuth: async () => {
        try {
          set({ loading: true });
          const user = await apiCheckAuth();
          if (user) {
            set({ user, isAuthorized: true, loading: false, isInitialized: true });
          } else {
            set({ user: null, isAuthorized: false, loading: false, isInitialized: true });
          }
        } catch {
          set({ user: null, isAuthorized: false, loading: false, isInitialized: true });
          await apiLogout();
        }
      },

      demoLogin: async () => {
        try {
          const user = await apiDemoLogin();
          set({ user, isAuthorized: true, isInitialized: true });
          return { success: true, user };
        } catch (err) {
          console.error("Error logging in demo user:", err);
          set({ isAuthorized: false, user: null, isInitialized: true });
          return { success: false, error: (err as Error).message };
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        // Don't persist user - always check with server on mount
        // Only persist isAuthorized for quick checks
        isAuthorized: state.isAuthorized,
      }),
    }
  )
);
