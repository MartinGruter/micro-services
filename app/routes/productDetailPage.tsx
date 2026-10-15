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
        <main>
            <h1>{product.name}</h1>
        </main>
    );
}