
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  apiRequest,
  type ApiUser,
  type AuthPayload,
} from "@/lib/api";

interface AuthContextValue {
  user: ApiUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const TOKEN_KEY = "leaflens_access_token";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const saveSession = useCallback((payload: AuthPayload) => {
    sessionStorage.setItem(TOKEN_KEY, payload.accessToken);
    setUser(payload.user);
  }, []);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      const token = sessionStorage.getItem(TOKEN_KEY);

      if (!token) {
        if (active) setLoading(false);
        return;
      }

      try {
        const response = await apiRequest<{ user: ApiUser }>(
          "/auth/me",
          { method: "GET" },
          token
        );

        if (active) setUser(response.data.user);
      } catch {
        sessionStorage.removeItem(TOKEN_KEY);
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    void restoreSession();

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await apiRequest<AuthPayload>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      );

      saveSession(response.data);
      router.replace("/dashboard");
    },
    [router, saveSession]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const response = await apiRequest<AuthPayload>(
        "/auth/register",
        {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
        }
      );

      saveSession(response.data);
      router.replace("/dashboard");
    },
    [router, saveSession]
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setUser(null);
    router.replace("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
