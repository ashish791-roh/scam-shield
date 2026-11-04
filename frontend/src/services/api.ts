const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface AuthUser {
  id: string;
  _id?: string;
  name: string;
  email: string;
  createdAt?: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: AuthUser;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }

  return data as T;
}

export const authAPI = {
  register(name: string, email: string, password: string) {
    return request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  },

  login(email: string, password: string) {
    return request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  getMe(token: string) {
    return request<{ success: boolean; user: AuthUser }>(
      "/auth/me",
      { method: "GET" },
      token
    );
  },
};