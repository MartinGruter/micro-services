import { Link } from "react-router";
import type { Product } from "~/types/Product";

type ProductProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

const ProductCard = ({ product, onAdd }: ProductProps) => {
  return (
    <article className="rounded-lg border border-slate-300 p-5 shadow-sm dark:border-slate-700">
      <Link to={`/products/${product.id}`}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="mb-4 h-48 w-full rounded object-cover"
            loading="lazy"
          />
        ) : (
          <div className="mb-4 flex h-48 w-full items-center justify-center rounded bg-slate-200 text-slate-500 dark:bg-slate-800">
            No image
          </div>
        )}
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          {product.description}
        </p>
        <dl className="mt-5 space-y-2">
          <div className="flex justify-between gap-4">
            <dt className="font-medium">Price</dt>
            <dd>
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-medium">Stock</dt>
            <dd>{product.stock}</dd>
          </div>
        </dl>
      </Link>
      <button
        type="button"
        onClick={() => onAdd(product)}
        className="mt-4 rounded-md border border-slate-500 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-800 hover:text-slate-100"
      >
        Add to cart
      </button>
    </article>
  );
};
export default ProductCard;
