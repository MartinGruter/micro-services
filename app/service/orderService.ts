import type { OrderRequestDTO } from "../types/Order";

const ORDER_SERVICE_URL = import.meta.env.VITE_API_ORDER_SERVICE_URL;

export const createOrder = async (
    accessToken: string,
    order: OrderRequestDTO
) => {
    
    const response = await fetch(`${ORDER_SERVICE_URL.replace(/\/$/, "")}/orders`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        throw new Error(`Failed order status: ${response.status}`)
    }

    return response.json;
}
