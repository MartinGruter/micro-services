import type { Category } from "./Category";

export type ProductRequest = {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
    imageUrl: string;
};