import { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
  useFetcher,
} from "react-router";
import ProductCard from "~/components/ProductCard";
import { getProducts } from "~/service/productService";
import type { Route } from "./+types/productsPage";
import { tokenContext } from "~/context/context";
import type { CartItemType } from "~/types/CartItemType";
import type { Product } from "~/types/Product";
import { createOrder } from "~/service/orderService";
import Cart from "~/components/cart/Cart";
import { categories } from "~/types/Category";

export async function loader({ context }: Route.LoaderArgs) {
  const accessToken = context.get(tokenContext);
  return { products: await getProducts(accessToken) };
}

export async function action({ request, context }: Route.ActionArgs) {
  const accessToken = context.get(tokenContext);
  const formData = await request.formData();
  const orderRequest = JSON.parse(formData.get("order") as string);

  try {
    await createOrder(accessToken, orderRequest);
    return { success: true as const };
  } catch (error) {
    console.log("Checkout failed:", error);
    return {
      success: false as const,
      error: "Something went wrong with creating the order. Please try again.",
    };
  }
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
  const fetcher = useFetcher<typeof action>();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  useEffect(() => {
    try {
      const savedCart = sessionStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch {}
    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (!cartLoaded) return;
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, cartLoaded]);

  function addToCart(product: Product) {
    const index = cartItems.findIndex((item) => item.id === product.id);

    if (index === -1) {
      const newItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newItem]);
      return;
    }

    const currentItem = cartItems[index];

    if (currentItem.quantity >= currentItem.stock) {
      alert("There are no more products in storage");
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
    const index = cartItems.findIndex((item) => item.id === productId);

    const currentItem = cartItems[index];

    if (currentItem.quantity >= currentItem.stock) {
      alert("There are no more products in storage");
      return;
    }

    const updatedItems = [...cartItems];
    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    };

    setCartItems(updatedItems);
  }

  function decreaseQuantity(productId: number) {
    const index = cartItems.findIndex((item) => item.id === productId);

    const currentItem = cartItems[index];
    const updatedItems = [...cartItems];

    if (currentItem.quantity === 1) {
      updatedItems.splice(index, 1);
      setCartItems(updatedItems);
      return;
    }

    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity - 1,
    };

    setCartItems(updatedItems);
  }

  function handleCheckout() {
  if (cartItems.length === 0) {
    alert("Cart is empty");
    return;
  }

  const orderRequest = {
    items: cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
  };

  fetcher.submit(
    { order: JSON.stringify(orderRequest) },
    { method: "post" },
  );
}

useEffect(() => {
  if (fetcher.data?.success) {
    setCartItems([]);
    alert("Order is created");
  }
}, [fetcher.data]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Products</h1>
      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <label htmlFor="category-filter" className="block text-sm">Category</label>
          <div className="relative mt-2">
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="appearance-none rounded-md border border-slate-500 bg-slate-900 py-2 pl-4 pr-10 text-slate-100"
          >
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <IoChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-100" />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowCart(!showCart)}
          className="shrink-0 rounded-md border border-slate-500 px-4 py-2 text-sm transition-colors hover:bg-slate-800 hover:text-slate-100"
        >
          {showCart ? "Hide cart" : "Show cart"}
        </button>
      </div>
      {products.length === 0 && (
        <p className="mt-6 text-slate-600 dark:text-slate-300">
          No products are available.
        </p>
      )}
      {products.length > 0 && filteredProducts.length === 0 && (
        <p className="mt-6 text-slate-600 dark:text-slate-300">
          No products found in this category.
        </p>
      )}
      {filteredProducts.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      )}

      {showCart && (
        <Cart
          items={cartItems}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onCheckout={handleCheckout}
          onClose={() => setShowCart(false)}
        />
      )}
    </main>
  );
}
