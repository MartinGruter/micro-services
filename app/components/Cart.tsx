import type { CartItem } from "~/types/CartItem";
import ProductCard from "./ProductCard";

type CartProps = {
    items: CartItem[];
};

const Cart = ({ items }: CartProps) => {
    return (
        <div>{items.map(item => (
            <li>
                {item.name}
            </li>
        ))}</div>
    )
}
export default Cart;