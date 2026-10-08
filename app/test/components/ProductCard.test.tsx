import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type { Product } from "~/types/Product";
import ProductCard from "~/components/ProductCard";
import userEvent from "@testing-library/user-event";

const product: Product = {
    id: 1,
    name: "Computer",
    description: "Very good computer",
    price: 499,
    stock: 10
};

afterEach(() => {
    cleanup();
});

describe("ProductCard", () => {
    it("visar ProductCard", () => {
        render(<ProductCard product={product} onAdd={vi.fn()} />);

        expect(screen.getByText("Computer")).toBeInTheDocument();
        expect(screen.getByText("Very good computer")).toBeInTheDocument();
        expect(screen.getByText("$499.00")).toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
    });

    it("anropar onAdd", async () => {
        const onAdd = vi.fn();
        const user = userEvent.setup();

        render(<ProductCard product={product} onAdd={onAdd} />);

        await user.click(screen.getByRole("button", { name: /add to cart/i }));

        expect(onAdd).toHaveBeenCalledTimes(1);
        expect(onAdd).toHaveBeenCalledWith(product);
    });
});