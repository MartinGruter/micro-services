import { Form } from "react-router";
import { categories } from "~/types/Category";

export default function ProductForm() {
    return (
        <Form method="post" className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
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
                    defaultValue=""
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
                    type="url"
                    required
                    className="mt-2 w-full rounded-md border border-slate-500 bg-transparent px-4 py-2"
                />
            </div>

            <button
                type="submit"
                className="rounded-sm border-2 border-slate-600 px-6 py-3 text-sm font-medium transition-colors hover:bg-slate-800 hover:text-slate-100"
            >
                Create product
            </button>
        </Form>
    );
}
