import { useLoaderData } from "react-router";
import { tokenContext } from "~/context/context";
import { getProducts } from "~/service/productService";
import type { Route } from "./+types/adminProductsPage";

export async function loader({ context }: Route.LoaderArgs) {
  const accessToken = context.get(tokenContext);
  return { products: await getProducts(accessToken) };
}

export default function AdminProductsPage() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Product overview</h1>

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
