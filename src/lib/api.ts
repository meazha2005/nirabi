import { siteConfig } from "@/data/siteConfig";

const BASE = siteConfig.apiBaseUrl;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    let detail = "Something went wrong. Please try again.";
    try {
      const body = await res.json();
      detail = body.detail || detail;
    } catch {
      /* fall through to default message */
    }
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
  return res.json();
}

export const api = {
  // Public API
  getProjects: (category?: string) =>
    request<any[]>(`/api/projects${category && category !== "All" ? `?category=${encodeURIComponent(category)}` : ""}`),
  getProject: (slug: string) => request<any>(`/api/projects/${slug}`),
  getServices: () => request<any[]>(`/api/services`),
  createLead: (payload: Record<string, unknown>) =>
    request<any>(`/api/leads`, { method: "POST", body: JSON.stringify(payload) }),
  sendChatMessage: (payload: { session_id: string; message: string; client_messages?: any[]; context?: Record<string, unknown> }) =>
    request<any>(`/api/chatbot/message`, { method: "POST", body: JSON.stringify(payload) }),

  // Admin API
  login: (email: string, password: string) =>
    request<{ access_token: string }>(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  getMe: (token: string) =>
    request<any>(`/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } }),
  getDashboard: (token: string) =>
    request<any>(`/api/admin/dashboard`, { headers: { Authorization: `Bearer ${token}` } }),
  getLeads: (token: string, params: string = "") =>
    request<{ total: number; items: any[] }>(`/api/admin/leads${params}`, { headers: { Authorization: `Bearer ${token}` } }),
  getLead: (token: string, id: string) =>
    request<any>(`/api/admin/leads/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
  getLeadConversations: (token: string, id: string) =>
    request<any[]>(`/api/admin/leads/${id}/conversations`, { headers: { Authorization: `Bearer ${token}` } }),
  updateLeadStatus: (token: string, id: string, lead_status: string) =>
    request<any>(`/api/admin/leads/${id}/status`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ lead_status }),
    }),
  deleteLead: (token: string, id: string) =>
    request<any>(`/api/admin/leads/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
  changePassword: (token: string, payload: Record<string, string>) =>
    request<any>(`/api/auth/change-password`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    }),
};
