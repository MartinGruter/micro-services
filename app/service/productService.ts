import type { Product } from "~/types/Product";

const PRODUCT_SERVICE_URL = import.meta.env.VITE_API_PRODUCT_SERVICE_URL;

export async function getProducts(accessToken: string): Promise<Product[]> {
  if (!PRODUCT_SERVICE_URL) {
    throw new Error("VITE_API_PRODUCT_SERVICE_URL is missing.");
  }

  const response = await fetch(
    `${PRODUCT_SERVICE_URL.replace(/\/$/, "")}/products`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Unable to load products.");
  }

  return response.json() as Promise<Product[]>;
}
