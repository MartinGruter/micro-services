import { getProductById } from "~/service/productService";
import type { Route } from "./+types/productDetailPage";
import { tokenContext } from "~/context/context";
import { useLoaderData } from "react-router";

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

export default function ProductDetailPage() {
    const { product } = useLoaderData<typeof loader>();

    return (
        <main>
            <h1>{product.name}</h1>
        </main>
    );
}