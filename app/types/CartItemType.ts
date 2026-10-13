import type { Product } from "./Product";

export type CartItemType = Product & {
    quantity: number;
}