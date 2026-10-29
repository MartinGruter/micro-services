import { useState } from "react";
import { data, Link, useLoaderData } from "react-router";
import { tokenContext } from "~/context/context";
import { getProducts } from "~/service/productService";
import { commitSession, getSession } from "~/sessions.server";
import { categories } from "~/types/Category";
import type { Route } from "./+types/adminProductsPage";

export async function loader({ request, context }: Route.LoaderArgs) {
  const accessToken = context.get(tokenContext);
  const products = await getProducts(accessToken);
  const session = await getSession(request.headers.get("Cookie"));
  const message = session.get("productCreated");

  return data(
    { products, message },
    {
      headers: message
        ? { "Set-Cookie": await commitSession(session) }
        : undefined,
    },
  );
}

export default function AdminProductsPage() {
  const { products, message } = useLoaderData<typeof loader>();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Product overview</h1>
      <Link
        to="/admin/products/new"
        className="mt-6 px-6 py-3 inline-block rounded-md border-2 border-slate-400 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      >
        Create product
      </Link>
      {message && (
        <p role="status" className="mt-4 text-slate-700 dark:text-slate-300">
          {message}
        </p>
      )}

      <div className="mt-6">
        <label htmlFor="admin-category-filter" className="block text-sm text-slate-700 dark:text-slate-300">
          Category
        </label>
        <select
          id="admin-category-filter"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="mt-2 px-4 py-2 rounded-md border border-slate-300 bg-white dark:border-slate-500 dark:bg-slate-900"
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {products.length === 0 ? (
        <p className="mt-6 text-slate-600 dark:text-slate-300">No products found.</p>
      ) : filteredProducts.length === 0 ? (
        <p className="mt-6 text-slate-600 dark:text-slate-300">No products found in this category.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-700">
                <th className="px-3 py-3 text-slate-700 dark:text-slate-300">Image</th>
                <th className="px-3 py-3 text-slate-700 dark:text-slate-300">ID</th>
                <th className="px-3 py-3 text-slate-700 dark:text-slate-300">Name</th>
                <th className="px-3 py-3 text-slate-700 dark:text-slate-300">Description</th>
                <th className="px-3 py-3 text-slate-700 dark:text-slate-300">Price</th>
                <th className="px-3 py-3 text-slate-700 dark:text-slate-300">Stock</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  className="border-b border-slate-200 dark:border-slate-800"
                  key={product.id}
                >
                  <td className="px-3 py-3">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-12 w-12 rounded object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
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
