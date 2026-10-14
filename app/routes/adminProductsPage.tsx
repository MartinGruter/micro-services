import { data, Link, useLoaderData } from "react-router";
import { tokenContext } from "~/context/context";
import { getProducts } from "~/service/productService";
import { commitSession, getSession } from "~/sessions.server";
import type { Route } from "./+types/adminProductsPage";

export async function loader({ request, context }: Route.LoaderArgs) {
  const accessToken = context.get(tokenContext);
  const products = await getProducts(accessToken);
  const session = await getSession(request.headers.get("Cookie"));
  const message = session.get("productCreated");

  return data({ products, message }, {
    headers: message ? { "Set-Cookie": await commitSession(session) } : undefined,
  });
}

export default function AdminProductsPage() {
  const { products, message } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Product overview</h1>
      <Link
        to="/admin/products/new"
        className="mt-6 inline-block rounded-sm border-2 border-slate-600 px-6 py-3 text-sm font-medium transition-colors hover:bg-slate-800 hover:text-slate-100"
      >
        Create product
      </Link>
      {message && <p role="status" className="mt-4">{message}</p>}

      {products.length === 0 ? (
        <p className="mt-6">No products found.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-700">
                <th className="px-3 py-3">ID</th>
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Description</th>
                <th className="px-3 py-3">Price</th>
                <th className="px-3 py-3">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  className="border-b border-slate-200 dark:border-slate-800"
                  key={product.id}
                >
                  <td className="px-3 py-3">{product.id}</td>
                  <td className="px-3 py-3">{product.name}</td>
                  <td className="px-3 py-3">{product.description}</td>
                  <td className="px-3 py-3">
                    {product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                  <td className="px-3 py-3">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
