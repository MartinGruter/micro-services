import type { OrderRequestDTO } from "../types/Order";

const API_URL = import.meta.env.VITE_API_ORDER_SERVICE_URL;

export const createOrder = async (
  accessToken: string,
  order: OrderRequestDTO,
) => {
  const response = await fetch(`${API_URL.replace(/\/$/, "")}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error(`Order failed with status ${response.status}`);
  }

  return response.json();
};  