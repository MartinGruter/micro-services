import { FiMinusCircle, FiPlusCircle } from "react-icons/fi"
import type { CartItemType } from "~/types/CartItemType";

interface CartItemProps {
    item: CartItemType;
    onIncrease: (productId: number) => void;
    onDecrease: (productId: number) => void;
}

export const CartItem = ({ item, onIncrease, onDecrease }: CartItemProps) => {
    const lineTotal = item.price * item.quantity;

    return <li className="py-4">
        <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-medium">
                {item.name}
            </h3>
            <p className="shrink-0 text-sm text-slate-600 dark:text-slate-300">
                {lineTotal.toFixed(2)} $
            </p>
        </div>

        <div className="mt-3 flex items-center gap-3">
            <FiMinusCircle
                onClick={() => onDecrease(item.id)}
                className="cursor-pointer size-6 text-slate-700 transition-colors hover:text-slate-400 dark:text-slate-300 dark:hover:text-slate-300/70"
            />
            <span className="w-5 text-center text-sm">
                {item.quantity}
            </span>
            <FiPlusCircle
                onClick={() => onIncrease(item.id)}
                className="cursor-pointer size-6 text-slate-700 transition-colors hover:text-slate-400 dark:text-slate-300 dark:hover:text-slate-300/70"
            />
        </div>
    </li>
}