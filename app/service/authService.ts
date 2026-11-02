import { getSession } from "~/sessions.server";
import type { LoginRequest } from "~/types/LoginRequest";
import type { TokenResponse } from "~/types/TokenResponse";

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL;

export async function login(
  loginRequest: LoginRequest,
): Promise<TokenResponse | undefined> {
  try {
    console.log("Login method called");

    const response = await fetch(`${GATEWAY_URL.replace(/\/$/, "")}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginRequest),
    });

    console.log(`Got response: {${response.status}} ok: {${response.ok}}`);

    if (!response.ok) {
      return undefined;
    }

    const data = await response.json() as TokenResponse;

    console.log("Login response data:", data);

    return data;
  } catch (error) {
    console.error("Login request failed: ", error);
    return undefined;
  }
}