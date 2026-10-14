export type OrderRequestDTO = {
    items: OrderItemRequestDTO[];
}

export type OrderItemRequestDTO = {
    productId: number;
    quantity: number;
}