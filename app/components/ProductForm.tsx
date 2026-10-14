import { Form } from "react-router";
import { categories } from "~/types/Category";
import type { ProductRequest } from "~/types/ProductRequest";

export type ProductFormValues = Record<keyof ProductRequest, string>;

type ProductFormProps = {
    values?: ProductFormValues;
    error?: string;
    isSubmitting?: boolean;
};

export default function ProductForm({ values, error, isSubmitting = false }: ProductFormProps) {
    return (
        <Form method="post" className="space-y-6">
            {error && <p role="alert" className="text-red-700 dark:text-red-300">{error}</p>}
            <div>
                <label htmlFor="name" className="block text-sm">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    defaultValue={values?.name}
                    type="text"
                    className="mt-2 w-full rounded-md border border-slate-500 bg-transparent px-4 py-2"
                    required
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={values?.description}
                    rows={4}
                    className="mt-2 w-full rounded-md border border-slate-500 bg-transparent px-4 py-2"
                    maxLength={1000}
                />
            </div>

            <div>
                <label htmlFor="price" className="block text-sm">
                    Price (USD)
                </label>
                <input
                    id="price"
                    name="price"
                    defaultValue={values?.price}
                    type="number"
                    step="0.01"
                    className="mt-2 w-full rounded-md border border-slate-500 bg-transparent px-4 py-2"
                    required
                    min={0.01}
                />
            </div>

            <div>
                <label htmlFor="stock" className="block text-sm">
                    Stock
                </label>
                <input
                    id="stock"
                    name="stock"
                    defaultValue={values?.stock}
                    type="number"
                    step="1"
                    className="mt-2 w-full rounded-md border border-slate-500 bg-transparent px-4 py-2"
                    required
                    min={0}
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    defaultValue={values?.category ?? ""}
                    required
                    className="mt-2 w-full rounded-md border border-slate-500 bg-slate-900 px-4 py-2 text-slate-100"
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="imageUrl" className="block text-sm">
                    Image URL
                </label>
                <input
                    id="imageUrl"
                    name="imageUrl"
                    defaultValue={values?.imageUrl}
                    type="url"
                    required
                    className="mt-2 w-full rounded-md border border-slate-500 bg-transparent px-4 py-2"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-sm border-2 border-slate-600 px-6 py-3 text-sm font-medium transition-colors hover:bg-slate-800 hover:text-slate-100 disabled:opacity-50"
            >
                {isSubmitting ? "Creating product..." : "Create product"}
            </button>
        </Form>
    );
}
