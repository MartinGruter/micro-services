import type { LoginRequest } from "~/types/LoginRequest";
import type { TokenResponse } from "~/types/TokenResponse";

const AUTH_URL = `${import.meta.env.VITE_API_AUTH_SERVICE_URL}/auth`;

export async function login(
  loginRequest: LoginRequest,
): Promise<TokenResponse | undefined> {
  try {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginRequest),
    });
    const data = await response.json() as TokenResponse;

    return data;
  } catch (error) {
    
  }
}
// export function logout() {}
// export function getToken() {}
// export function getCurrentUser() {}
// export function isAuthenticated() {}
