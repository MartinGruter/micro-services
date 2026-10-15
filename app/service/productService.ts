import type { Product } from "~/types/Product";
import type { ProductRequest } from "~/types/ProductRequest";

const PRODUCT_SERVICE_URL = import.meta.env.VITE_API_PRODUCT_SERVICE_URL;

export async function createProduct(
  product: ProductRequest,
  accessToken: string,
): Promise<Product> {
  if (!PRODUCT_SERVICE_URL) {
    throw new Error("Product service is not configured.");
  }

  let response: Response;
  try {
    response = await fetch(`${PRODUCT_SERVICE_URL.replace(/\/$/, "")}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(product),
    });
  } catch {
    throw new Error("Unable to reach the product service. Please try again later.");
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Your session has expired. Please log in again.");
    }
    if (response.status === 403) {
      throw new Error("You do not have permission to create products.");
    }
    if (response.status === 400) {
      throw new Error("The product was rejected. Please check the entered values.");
    }
    throw new Error("Unable to create the product. Please try again later.");
  }

  return response.json() as Promise<Product>;
}

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
    const body = await response.text();
    throw new Error(
      `Unable to load products. Status: ${response.status} ${body}`,
    );
  }

  return response.json() as Promise<Product[]>;
}

export async function getProductById(accessToken: string, id: string): Promise<Product> {
  if (!PRODUCT_SERVICE_URL) {
    throw new Error("VITE_API_PRODUCT_SERVICE_URL is missing.");
  }

  const response = await fetch(
    `${PRODUCT_SERVICE_URL.replace(/\/$/, "")}/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Unable to load product. Status: ${response.status}`);
  }

  return response.json() as Promise<Product>;
}
