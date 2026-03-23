// services/api.ts
// ─────────────────────────────────────────────────────────────
// Central API client for MotoDrive.
// Store the token in SecureStore (expo-secure-store) so it
// survives app restarts.
//
// Install:  npx expo install expo-secure-store
// ─────────────────────────────────────────────────────────────

import * as SecureStore from "expo-secure-store";

const BASE_URL = "http://10.82.250.82:3000/api"; // Android emulator → localhost
// const BASE_URL = "http://localhost:3000/api"; // iOS simulator
// const BASE_URL = "http://YOUR_LOCAL_IP:3000/api"; // Physical device

const TOKEN_KEY = "motodrive_token";

// ── Token helpers ─────────────────────────────────────────────
export async function saveToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function clearToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

// ── Shared fetch wrapper ──────────────────────────────────────
async function apiFetch(
  path: string,
  options: RequestInit = {},
  withAuth = false,
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (withAuth) {
    const token = await getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

// ── Auth API ─────────────────────────────────────────────────

export type RegisterPayload = {
  full_name: string;
  email: string;
  city?: string;
  age?: number;
  password: string;
};

/** Register a new user and store the JWT. */
export async function register(payload: RegisterPayload) {
  const data = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  await saveToken(data.token);
  return data; // { token, user }
}

/** Login and store the JWT. */
export async function login(email: string, password: string) {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  await saveToken(data.token);
  return data; // { token, user }
}

/** Logout — just clear the stored token. */
export async function logout() {
  await clearToken();
}

// ── Profile API ───────────────────────────────────────────────

export type ProfileUpdatePayload = {
  full_name?: string;
  city?: string;
  age?: number;
  avatar_url?: string;
  address_line?: string;
  address_city?: string;
  address_state?: string;
  address_zip?: string;
  address_country?: string;
};

/** Fetch the logged-in user's full profile. */
export async function fetchProfile() {
  const data = await apiFetch("/profile", {}, true);
  return data.user;
}

/** Update one or more profile fields. */
export async function updateProfile(payload: ProfileUpdatePayload) {
  const data = await apiFetch(
    "/profile",
    { method: "PATCH", body: JSON.stringify(payload) },
    true,
  );
  return data.user;
}
