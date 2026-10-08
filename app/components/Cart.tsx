import type { CartItem } from "~/types/CartItem";
import ProductCard from "./ProductCard";

type CartProps = {
    items: CartItem[];
    onIncrease: (productId: number) => void;
    onDecrease: (productId: number) => void;
};

const Cart = ({ items, onIncrease, onDecrease }: CartProps) => {
    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    return (
        <section>
            <h2>Cart</h2>
            {items.map(item => {
                const lineTotal = item.price * item.quantity;
            
            return (
            <article key={item.id}>
            <h3>{item.name}</h3>
            <button onClick={() => onDecrease(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => onIncrease(item.id)}>+</button>
            <p>Linetotal: {lineTotal.toFixed(2)} $</p>
            </article>
            );
        })}

        <strong>Total: {totalPrice.toFixed(2)} $</strong>
        </section>
        

        
    )
}
export default Cart;