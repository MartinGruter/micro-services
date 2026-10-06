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
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };

    setCartItems(currentItems => [
      ...currentItems,
      cartItem,
    ]);

    alert(`${product.name} has been added to cart.`);
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
            <ProductCard key={product.id} product={product} onAdd={addToCart}/>
          ))}
        </div>
      )}
      <button onClick={() => setShowCart(!showCart)}>
        {showCart
        ? "Hide cart"
        : "Show cart"
        }
        {showCart && <Cart items={cartItems}/>}
      </button>
    </main>
  );
}
