// services/api.ts
import * as SecureStore from "expo-secure-store";

const BASE_URL = "http://172.17.115.82:3000/api"; // ← your WiFi IP
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
  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

// ── Auth ──────────────────────────────────────────────────────
export type RegisterPayload = {
  full_name: string;
  email: string;
  city?: string;
  age?: number;
  password: string;
};

export async function register(payload: RegisterPayload) {
  const data = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  await saveToken(data.token);
  return data;
}

export async function login(email: string, password: string) {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  await saveToken(data.token);
  return data;
}

export async function logout() {
  await clearToken();
}

// ── Profile ───────────────────────────────────────────────────
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

export async function fetchProfile() {
  const data = await apiFetch("/profile", {}, true);
  return data.user;
}

export async function updateProfile(payload: ProfileUpdatePayload) {
  const data = await apiFetch(
    "/profile",
    { method: "PATCH", body: JSON.stringify(payload) },
    true,
  );
  return data.user;
}

// ── Bikes ─────────────────────────────────────────────────────
export type Bike = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  series?: string;
  description?: string;
  top_speed?: string;
  torque?: string;
  weight?: string;
  engine?: string;
  popular: boolean;
  stock: number;
};

export async function fetchBikes(params?: {
  category?: string;
  popular?: boolean;
  search?: string;
}): Promise<Bike[]> {
  const query = new URLSearchParams();
  if (params?.category) query.append("category", params.category);
  if (params?.popular) query.append("popular", "true");
  if (params?.search) query.append("search", params.search);
  const qs = query.toString() ? `?${query.toString()}` : "";
  const data = await apiFetch(`/bikes${qs}`);
  return data.bikes;
}

export async function fetchBikeById(id: number | string): Promise<Bike> {
  const data = await apiFetch(`/bikes/${id}`);
  return data.bike;
}

// ── Cart ──────────────────────────────────────────────────────
export type CartItem = {
  id: number;
  quantity: number;
  variant: string | null;
  added_at: string;
  bike: Bike;
};

export async function fetchCart(): Promise<{
  items: CartItem[];
  subtotal: number;
  count: number;
}> {
  return apiFetch("/cart", {}, true);
}

export async function addToCart(
  bike_id: number,
  quantity = 1,
  variant?: string,
) {
  return apiFetch(
    "/cart",
    { method: "POST", body: JSON.stringify({ bike_id, quantity, variant }) },
    true,
  );
}

export async function updateCartItem(cartItemId: number, quantity: number) {
  return apiFetch(
    `/cart/${cartItemId}`,
    { method: "PATCH", body: JSON.stringify({ quantity }) },
    true,
  );
}

export async function removeCartItem(cartItemId: number) {
  return apiFetch(`/cart/${cartItemId}`, { method: "DELETE" }, true);
}

export async function clearCart() {
  return apiFetch("/cart", { method: "DELETE" }, true);
}

// ── Orders ────────────────────────────────────────────────────
export type OrderItem = {
  id: number;
  order_id: number;
  bike_id: number;
  bike_name: string;
  bike_image: string;
  variant: string | null;
  quantity: number;
  unit_price: number;
  subtotal: number;
};

export type Order = {
  id: number;
  status: string;
  subtotal: number;
  shipping: number;
  total: number;
  payment_method: string;
  placed_at: string;
  items: OrderItem[];
};

export async function fetchOrders(): Promise<Order[]> {
  const data = await apiFetch("/orders", {}, true);
  return data.orders;
}

export async function fetchOrderById(id: number): Promise<Order> {
  const data = await apiFetch(`/orders/${id}`, {}, true);
  return data.order;
}

export async function placeOrder(payment_method = "upi", payment_ref?: string) {
  return apiFetch(
    "/orders",
    { method: "POST", body: JSON.stringify({ payment_method, payment_ref }) },
    true,
  );
}

export async function cancelOrder(id: number) {
  return apiFetch(`/orders/${id}/cancel`, { method: "PATCH" }, true);
}

export const formatPrice = (price: number) =>
  "$" + Number(price).toLocaleString("en-US");
