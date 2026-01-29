import { User } from "@/types/auth";
import { API_BASE_URL } from "./config";

const BASE_URL = `${API_BASE_URL}/api/v1/users`;

export async function apiLogin(email: string, password: string) {
  const resp = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => null);
    throw new Error(errorData?.message || "Login error");
  }

  const data = await resp.json();
  console.log("Login response headers:", [...resp.headers.entries()]);
  return data.data.user as User;
}

export async function apiLogout() {
  await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function apiCheckAuth() {
  const res = await fetch(`${BASE_URL}/check-auth`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data.user as User;
}

export async function apiDemoLogin() {
  const res = await fetch(`${BASE_URL}/demo-login`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok || data.status !== "success") {
    throw new Error(data.message || "Demo login failed");
  }

  return data.data.user as User;
}

export async function apiSignup(
  name: string,
  email: string,
  photo: string,
  password: string | undefined,
  confirmPassword: string
) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, photo, password, confirmPassword }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || data?.status !== "success") {
    throw new Error(data?.message || "Error signing up");
  }

  return data.data.user as User;
}
