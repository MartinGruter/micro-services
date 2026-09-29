import type {Product} from "../types/product-cart"
import {getToken} from "./authService";

const API_URL = import.meta.env.VITE_API_PRODUCT_SERVICE_URL;

export async function getProducts(): Promise<Product[]> {
    const token = getToken();

    const response = await fetch ('${API_URL}/products', {
        headers: {
            Authorization: 'Bearer ${token}',
        },
    })   
}