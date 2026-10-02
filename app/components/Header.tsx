import { Link } from "react-router";
import { NavItem } from "./Nav/NavItem";

export const Header = () => {
    return <header className="px-5 py-4 flex justify-between border-b border-slate-800">
        <div>
            <h3 className="font-['Changa One'] text-3xl font-bold">BlackMarqet</h3>
        </div>
        <nav className="flex items-center">
            <ul className="flex">
                <NavItem to="/" text="HOME" />
                <NavItem to="/products" text="PRODUCTS" />
            </ul>
        </nav>
    </header>;
}