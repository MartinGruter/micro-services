import { getSession } from "~/sessions.server";
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

    if (!response.ok) {
      return undefined;
    }

    const data = await response.json() as TokenResponse;

    return data;
  } catch (error) {
    console.error("Login request failed: ", error);
    return undefined;
  }
}
// export async function logout() {}
// export async function getToken() {}