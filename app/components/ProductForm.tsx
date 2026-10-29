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
                <label htmlFor="name" className="block text-sm text-slate-700 dark:text-slate-300">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    defaultValue={values?.name}
                    type="text"
                    className="w-full mt-2 px-4 py-2 rounded-md border border-slate-300 bg-transparent text-slate-900 dark:border-slate-500 dark:text-slate-100"
                    required
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm text-slate-700 dark:text-slate-300">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={values?.description}
                    rows={4}
                    className="w-full mt-2 px-4 py-2 rounded-md border border-slate-300 bg-transparent text-slate-900 dark:border-slate-500 dark:text-slate-100"
                    maxLength={1000}
                />
            </div>

            <div>
                <label htmlFor="price" className="block text-sm text-slate-700 dark:text-slate-300">
                    Price (USD)
                </label>
                <input
                    id="price"
                    name="price"
                    defaultValue={values?.price}
                    type="number"
                    step="0.01"
                    className="w-full mt-2 px-4 py-2 rounded-md border border-slate-300 bg-transparent text-slate-900 dark:border-slate-500 dark:text-slate-100"
                    required
                    min={0.01}
                />
            </div>

            <div>
                <label htmlFor="stock" className="block text-sm text-slate-700 dark:text-slate-300">
                    Stock
                </label>
                <input
                    id="stock"
                    name="stock"
                    defaultValue={values?.stock}
                    type="number"
                    step="1"
                    className="w-full mt-2 px-4 py-2 rounded-md border border-slate-300 bg-transparent text-slate-900 dark:border-slate-500 dark:text-slate-100"
                    required
                    min={0}
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm text-slate-700 dark:text-slate-300">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    defaultValue={values?.category ?? ""}
                    required
                    className="w-full mt-2 px-4 py-2 rounded-md border border-slate-300 text-slate-900 bg-white dark:border-slate-500 dark:bg-slate-900 dark:text-slate-100"
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
                <label htmlFor="imageUrl" className="block text-sm text-slate-700 dark:text-slate-300">
                    Image URL
                </label>
                <input
                    id="imageUrl"
                    name="imageUrl"
                    defaultValue={values?.imageUrl}
                    type="url"
                    required
                    className="w-full mt-2 px-4 py-2 rounded-md border border-slate-300 bg-transparent text-slate-900 dark:border-slate-500 dark:text-slate-100"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer px-6 py-2 rounded-sm border-2 border-slate-400 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
                {isSubmitting ? "Creating product..." : "Create product"}
            </button>
        </Form>
    );
}
