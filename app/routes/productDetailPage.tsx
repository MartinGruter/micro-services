import { getProductById } from "~/service/productService";
import type { Route } from "./+types/productDetailPage";
import { tokenContext } from "~/context/context";
import { isRouteErrorResponse, useLoaderData, useRouteError } from "react-router";

export async function loader({ context, params }: Route.LoaderArgs) {
    const accessToken = context.get(tokenContext);
    return { product: await getProductById(accessToken, params.id) };
}

export function HydrateFallback() {
    return (
        <main className="w-full max-w-3xl mx-auto px-4 py-12">
            <p>Loading product...</p>
        </main>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error) && error.status === 404) {
        return (
            <main className="w-full max-w-3xl mx-auto px-4 py-12">
                <p className="text-slate-300">
                    This product doesn't exist or has been removed.
                </p>
            </main>
        );
    }

    return (
        <main className="w-full max-w-3xl mx-auto px-4 py-12 text-center">
            <p className="text-red-300">There was something wrong with loading the product</p>
        </main>
    );
}

export default function ProductDetailPage() {
    const { product } = useLoaderData<typeof loader>();

    return (
        <main className="w-full max-w-4xl mx-auto px-4 py-12">
            <div className="grid gap-8 sm:grid-cols-2">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="aspect-video rounded object-cover"
                    />
                ) : (
                    <div className="aspect-video flex items-center justify-center rounded text-slate-500 bg-slate-800">
                        No image
                    </div>
                )}

                <div>
                    <span className="mt-6 px-3 py-1 inline-block rounded-full text-xs font-medium text-slate-300 bg-slate-800">
                        {product.category}
                    </span>

                    <h1 className="mt-4 text-3xl font-bold">{product.name}</h1>

                    <p className="mt-2 flex items-baseline gap-4 text-xl font-semibold">
                        {product.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                        <span className="text-sm text-slate-400">
                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                        </span>
                    </p>

                    <p className="mt-6 text-slate-300">
                        {product.description}
                    </p>
                </div>
            </div>
        </main>
    );
}