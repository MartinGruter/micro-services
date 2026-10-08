import { useState } from "react";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "react-router";
import Cart from "~/components/Cart";
import ProductCard from "~/components/ProductCard";
import { getProducts } from "~/service/productService";
import type { Route } from "./+types/productsPage";
import { tokenContext } from "~/context/context";
import type { CartItem } from "~/types/CartItem";
import type { Product } from "~/types/Product";

export async function loader({ context }: Route.LoaderArgs) {
  const accessToken = context.get(tokenContext);
  return { products: await getProducts(accessToken) };
}

export function HydrateFallback() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <p>Loading products...</p>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : "Unable to load products.";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <p className="text-red-700 dark:text-red-300">{message}</p>
    </main>
  );
}

export default function ProductsPage() {
  const { products } = useLoaderData<typeof loader>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  function addToCart(product: Product) {
    const index = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (index === -1) {
      const newItem = {...product, quantity: 1};
      setCartItems([...cartItems, newItem]);
      return;
    }

    const currentItem = cartItems[index];

    if (currentItem.quantity >= currentItem.stock) {
      alert("There are no more products in storage")
      return;
    }

    const updatedItems = [...cartItems];
    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    };

    setCartItems(updatedItems);

    alert(`${product.name} has been added to cart.`);
  }

  function increaseQuantity(productId: number) {
    const index = cartItems.findIndex(
      (item) => item.id === productId
    );

    const currentItem = cartItems[index]

    if (currentItem.quantity >= currentItem.stock){
      alert("There are no more products in storage")
      return;
    }

    const updatedItems = [...cartItems];
    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1
    };

    setCartItems(updatedItems)
  }

  function decreaseQuantity(productId: number) {
    const index = cartItems.findIndex(
      (item) => item.id === productId
    );

    const currentItem = cartItems[index];
    const updatedItems = [...cartItems];

    if (currentItem.quantity === 1){
      updatedItems.splice(index, 1);
      setCartItems(updatedItems);
      return;
    }

    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity - 1
    }

    setCartItems(updatedItems)
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Products</h1>
      {products.length === 0 && (
        <p className="mt-6 text-slate-600 dark:text-slate-300">
          No products are available.
        </p>
      )}
      {products.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      )}
      <button onClick={() => setShowCart(!showCart)}>
        {showCart
          ? "Hide cart"
          : "Show cart"
        }
        {showCart && <Cart 
        items={cartItems}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        />}
      </button>
    </main>
  );
}
