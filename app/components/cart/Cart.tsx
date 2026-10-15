import { IoClose } from "react-icons/io5";
import type { CartItemType } from "~/types/CartItemType";
import { CartItem } from "./CartItem";

type CartProps = {
    items: CartItemType[];
    onIncrease: (productId: number) => void;
    onDecrease: (productId: number) => void;
    onClose: () => void;
    onCheckout: () => void;
};

const Cart = ({ items, onIncrease, onDecrease, onClose, onCheckout }: CartProps) => {
    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    return <>
        <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={onClose}
        />
        <aside className="w-full max-w-sm fixed inset-y-0 right-0 z-50 flex flex-col bg-slate-900 select-none">
            <header className="px-6 py-5 flex items-center justify-between border-b border-[#9c9177]/20">
                <div>
                    <p className="text-[10px] tracking-[0.25em] text-slate-400">
                        BLACKMARQET
                    </p>
                    <h2 className="mt-1 text-xl font-medium">
                        The Manifest
                    </h2>
                </div>
                <IoClose className="size-8 p-1 rounded-md cursor-pointer hover:bg-slate-300/10" onClick={onClose} />
            </header>

            <div className="px-6 py-4 flex-1 overflow-y-auto">
                {
                    items.length === 0 ? (
                        <p className="mt-10 text-center text-sm text-slate-400">
                            Nothing's been claimed yet.
                        </p>
                    ) : (
                        <ul className="divide-y divide-[#9c9177]/15">
                            {
                                items.map((item) => (
                                    <CartItem key={item.id} item={item} onIncrease={onIncrease} onDecrease={onDecrease} />
                                ))
                            }
                        </ul>
                    )
                }
            </div>

            <footer className="px-6 py-5 flex items-baseline justify-between border-t border-[#9c9177]/20">
                <span className="text-sm text-slate-200">Total:</span>
                <strong className="text-xl">
                    ${totalPrice.toFixed(2)}
                </strong>
            </footer>
            <div className="px-6 pb-6">
                <button
                    type="button"
                    onClick={onCheckout}
                    className="w-full rounded-md border border-slate-500 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
                >
                    Send order
                </button>
            </div>
        </aside>
    </>
}
export default Cart;
