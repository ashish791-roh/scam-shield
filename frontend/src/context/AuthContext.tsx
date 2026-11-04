import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";
import { authAPI } from "../services/api";
import type { AuthUser } from "../services/api";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "scamshield_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authAPI.getMe(token);

        if (active) {
          setUser(response.user);
        }
      } catch {
        if (active) {
          clearSession();
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, [token, clearSession]);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login(email, password);

    if (!response.token || !response.user) {
      throw new Error("Invalid login response from server.");
    }

    localStorage.setItem(TOKEN_KEY, response.token);
    setToken(response.token);
    setUser(response.user);
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    const response = await authAPI.register(name, email, password);

    if (!response.token || !response.user) {
      throw new Error("Invalid registration response from server.");
    }

    localStorage.setItem(TOKEN_KEY, response.token);
    setToken(response.token);
    setUser(response.user);
  };

  const logout = () => {
    clearSession();
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}