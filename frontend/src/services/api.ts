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

export type ScanType =
  | "message"
  | "url"
  | "email"
  | "phone"
  | "job"
  | "marketplace";

export interface ScanSignal {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  points: number;
}

export interface ScanAnalysis {
  type: ScanType;
  riskScore: number;
  riskLevel: "low" | "medium" | "high";
  verdict: string;
  signals: ScanSignal[];
  recommendations: string[];
  limitations: string[];
  analyzedAt: string;
}

interface ScanResponse {
  success: boolean;
  message: string;
  analysis: ScanAnalysis;
}

export const scanAPI = {
  analyze(type: ScanType, content: string, token: string) {
    return request<ScanResponse>(
      "/scans",
      {
        method: "POST",
        body: JSON.stringify({ type, content }),
      },
      token
    );
  },
};


export interface SubmissionResponse {
  success: boolean;
  message: string;
}

export type ScamReportType =
  | "message"
  | "url"
  | "email"
  | "phone"
  | "job"
  | "marketplace"
  | "other";

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ScamReportSubmission {
  type: ScamReportType;
  suspiciousContent: string;
  description: string;
  reporterName?: string;
  reporterEmail?: string;
}

export const submissionAPI = {
  contact(data: ContactSubmission) {
    return request<SubmissionResponse>("/submissions/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  report(data: ScamReportSubmission) {
    return request<SubmissionResponse>("/submissions/reports", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
