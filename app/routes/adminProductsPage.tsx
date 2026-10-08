import {
  redirect,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import { getProducts } from "~/service/productService";
import { getSession } from "~/sessions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const roles = session.get("roles") ?? [];

  if (!accessToken) {
    throw redirect("/login");
  }

  if (!roles.includes("ROLE_ADMIN")) {
    throw new Response("Forbidden", {
      status: 403,
      statusText: "Forbidden",
    });
  }

  return { products: await getProducts(accessToken) };
}

export default function AdminProductsPage() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Product overview</h1>

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
    </main>
  );
}
