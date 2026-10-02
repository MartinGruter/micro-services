export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  expiresIn: number;
  subject: string;
  roles: string[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(credentials: LoginRequest): Promise<TokenResponse> {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is missing from the environment configuration.");
  }

  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(
      response.status === 401 || response.status === 403
        ? "Incorrect username or password."
        : "Unable to log in. Please try again later.",
    );
  }

  return response.json() as Promise<TokenResponse>;
}
