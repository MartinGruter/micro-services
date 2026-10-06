import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "react-router";
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
            <article
              className="rounded-lg border border-slate-300 p-5 shadow-sm dark:border-slate-700"
              key={product.id}
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                {product.description}
              </p>
              <dl className="mt-5 space-y-2">
                <div className="flex justify-between gap-4">
                  <dt className="font-medium">Price</dt>
                  <dd>
                    {product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium">Stock</dt>
                  <dd>{product.stock}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
