import { data, redirect, useNavigation } from "react-router";
import ProductForm, { type ProductFormValues } from "~/components/ProductForm";
import { tokenContext } from "~/context/context";
import { createProduct } from "~/service/productService";
import { categories } from "~/types/Category";
import { commitSession, getSession } from "~/sessions.server";
import type { Route } from "./+types/createProductPage";

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  function read(name: string) {
    const value = formData.get(name);
    return typeof value === "string" ? value.trim() : "";
  }

  const values: ProductFormValues = {
    name: read("name"),
    description: read("description"),
    price: read("price"),
    stock: read("stock"),
    category: read("category"),
    imageUrl: read("imageUrl"),
  };
  const price = Number(values.price);
  const stock = Number(values.stock);
  const category = categories.find((item) => item === values.category);

  let error: string | undefined;
  if (!values.name) {
    error = "Name is required.";
  } else if (values.description.length > 1000) {
    error = "Description must be at most 1000 characters.";
  } else if (!/^\d+(\.\d{1,2})?$/.test(values.price) || !Number.isFinite(price) || price < 0.01) {
    error = "Enter a positive price with at most two decimal places.";
  } else if (!values.stock || !Number.isInteger(stock) || stock < 0 || stock > 2147483647) {
    error = "Stock must be a whole number between 0 and 2147483647.";
  } else if (!category) {
    error = "Select a valid category.";
  } else {
    try {
      const url = new URL(values.imageUrl);
      if (url.protocol !== "https:" && url.protocol !== "http:") {
        error = "Enter a valid HTTP or HTTPS image URL.";
      }
    } catch {
      error = "Enter a valid HTTP or HTTPS image URL.";
    }
  }

  if (error || !category) {
    return data({ error: error ?? "Select a valid category.", values }, { status: 400 });
  }

  try {
    await createProduct({ ...values, price, stock, category }, context.get(tokenContext));
  } catch (error) {
    return data({
      error: error instanceof Error ? error.message : "Unable to create the product.",
      values,
    }, { status: 502 });
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.flash("productCreated", "Product created successfully.");
  return redirect("/admin/products", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function CreateProductPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Create product</h1>
      <ProductForm
        values={actionData?.values}
        error={actionData?.error}
        isSubmitting={navigation.state !== "idle"}
      />
    </main>
  );
}
